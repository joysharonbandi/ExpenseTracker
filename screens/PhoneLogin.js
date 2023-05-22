import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import React, {useState, useEffect, useRef, useContext} from 'react';
import {Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import Loader from '../src/components/Loader';
import OtpView from '../src/components/OtpView';
import {UserContext} from '../App';

export default function PhoneLogin({navigation}) {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  const [initializing, setInitializing] = useState(true);
  //   const [user, setUser] = useState();

  const {user, setUser} = useContext(UserContext);

  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const [loader, setLoader] = useState(false);
  const textRef = useRef();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'LOGIN /SIGNUP',
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [confirm]);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    setLoader(true);
    var number = '+91' + phoneNumber;
    const confirmation = await auth().signInWithPhoneNumber(number);

    setLoader(false);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    setLoader(true);
    try {
      await confirm.confirm(code);
      setConfirm(null);
    } catch (error) {
      setError(error.code);
      setLoader(false);
    }
  }

  const focusTextInput = () => {
    textRef.current.focus();
  };
  //   if (initializing) return null;
  if (user) {
    navigation.replace('Home');

    // setUser(user);

    if (loader === 'true') {
      setLoader(false);
    }

    // return (
    //   <View>
    //     <Text>Login</Text>
    //     <Text onPress={logout}>logout</Text>
    //   </View>
    // );
  } else if (!confirm) {
    return (
      <View style={styles.main}>
        {loader && <Loader />}
        <Text style={{alignSelf: 'flex-start', fontSize: 20}}>
          Enter Mobile Number
        </Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="phoneNumber"
          onChangeText={val => setNumber(val)}
          style={{
            // borderWidth: 1,
            // width: 300,
            width: '100%',
            height: 60,
            backgroundColor: '#DCDCDC',
            marginTop: 10,
          }}></TextInput>
        <TouchableOpacity onPress={() => signInWithPhoneNumber(number)}>
          <View
            style={{
              borderWidth: 2,
              // borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 100,

              //   backgroundColor: 'black',
              marginTop: 25,
              padding: 15,
              backgroundColor: 'lightcyan',
              borderRadius: 10,
            }}>
            <Text>SEND OTP</Text>
          </View>
        </TouchableOpacity>
      </View>
      //   <Button
      //     title="Phone Number Sign In"
      //     onPress={() => signInWithPhoneNumber('+919912554702')}
      //   />
    );
  }
  //

  return (
    <ScrollView>
      {loader && <Loader />}
      <Text style={{alignSelf: 'center'}}>Otp sent to {'+91' + number}</Text>

      <View style={{marginTop: 20}}>
        <OtpView onPress={focusTextInput} text={code} />
        <TextInput
          value={code}
          onChangeText={text => setCode(text)}
          ref={textRef}
          style={{position: 'absolute', top: 0, left: 0, height: 0, width: 0}}
          keyboardType={'number-pad'}
          //   autoFocus
        />
        <TouchableOpacity onPress={() => confirmCode()}>
          <View
            style={{
              borderWidth: 2,
              // borderRadius: 10,
              paddingVertical: 10,
              //   paddingHorizontal: 100,
              padding: 15,
              backgroundColor: 'lightcyan',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 50,
              marginTop: 10,
            }}>
            <Text>Confirm Code</Text>
          </View>
        </TouchableOpacity>
        {
          <Text style={{color: 'red', alignSelf: 'center', fontSize: 20}}>
            {error}
          </Text>
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 50,
  },
});
