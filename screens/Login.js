import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {UserContext} from '../App';
import showpass from '../assests/show.png';
import hidepass from '../assests/hide.png';
import google from '../assests/google.png';
import facebook from '../assests/facebook.png';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import database from '@react-native-firebase/database';
// import {useSelector, useDispatch} from 'react-redux';
import {
  increment,
  decrement,
  arr1,
  changeState,
} from '../redux/actions/countAction';

export default function Login({navigation}) {
  const [email1, setEmail] = useState('');
  const [pass1, setPass] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [bColor, setBcolor] = useState('black');
  const [passBcolor, setPassbcolor] = useState('black');
  const {email, setEmail1, user, setUser} = useContext(UserContext);
  //   const dispatch = useDispatch();

  // const {count1, arr, user1} = useSelector(store => ({
  //   count1: store.count.count,
  //   arr: store.count.setArr,
  //   user1: store.count.setUsername,
  // }));

  var va = '';
  const validate = text => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    setMail(text);
    if (text == '' && reg.test(text) == false) {
      setEmail();
    } else if (reg.test(text) == false) {
      //   setEmail('Enter valid email address');
    } else {
      setEmail('');
    }
  };

  const validatePass = text => {
    const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    setPassword(text);
    if (text == '') {
      setPass();
    } else if (reg.test(text) == false) {
      //   setPass('Enter valid password');
    } else {
      setPass();
    }
  };

  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    // dispatch(changeState('user', user));
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  const login = () => {
    if (mail === '' && password === '') {
      setBcolor('red');
      setPassbcolor('red');
      setEmail('The field should not be empty');
      setPass('The field should not be empty');
    } else if (mail === '' && password != '') {
      setBcolor('red');
      setEmail('The field should not be empty ');
      setPass('');
      setPassbcolor('black');
    } else if (mail != '' && password === '') {
      setPassbcolor('red');
      setBcolor('black');
      setEmail('');
      setPass('The field should not be empty ');
    } else {
      setLoad(true);

      auth()
        .signInWithEmailAndPassword(mail, password)
        .then(() => {
          database()
            .ref('/users/123')
            .once('value')
            .then(snapshot => {});
          setLoad(false);
          //   navigation.pop();
          //   // setEmail1(user);
          //   navigation.navigate('HomeScreen');
          // setEmail1(user['email']);
        })
        .catch(error => {
          setLoad(false);
          if (error.code === 'auth/email-already-in-use') {
            setPass('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            setPass('That email address is invalid!');
          }

          if (error.code === 'auth/user-not-found') {
            setEmail1('');
            setPass('auth/user-not-found');
          }
          console.error(error);
        });
    }
  };

  const register = () => {
    auth()
      .createUserWithEmailAndPassword(mail, password)
      .then(() => {})
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
        }
        if (error.code === 'auth/invalid-email') {
        }

        console.error(error);
      });
  };
  const showPassword = () => {
    setShow(!show);
  };

  if (initializing) return null;
  else if (user) {
    // navigation.pop();
    navigation.replace('HomeScreen');
  }

  //google
  //   GoogleSignin.configure({
  //     webClientId:
  //       '1021213088152-7kjdvh6t60fnt5l54s1nb0a24mbok5ia.apps.googleusercontent.com',
  //   });

  async function onGoogleButtonPress() {
    // Get the users ID token

    try {
      const {idToken} = await GoogleSignin.signIn().catch(e => {
        ToastAndroid.show(e.message, ToastAndroid.SHORT);
      });

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (e) {}
  }

  //facebook
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(facebookCredential)
      .catch(e => {
        ToastAndroid.show(e.code, ToastAndroid.SHORT);
      });
  }

  return (
    <View style={styles.main}>
      {load && (
        <Modal
          animationType="fade"
          transparent={true}
          //   visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 0.7,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <ActivityIndicator size="large" />
            </View>
          </View>
        </Modal>
      )}
      <View style={{flex: 0.2, justifyContent: 'flex-end'}}>
        <Text style={{fontSize: 40, fontWeight: 'bold', color: 'black'}}>
          Sign in
        </Text>
      </View>
      <View style={styles.emailView}>
        <View style={{width: '100%'}}>
          <TextInput
            style={{...styles.email, ...{borderColor: bColor}}}
            placeholder="EMAIL"
            onChangeText={validate}
          />
        </View>

        <View>
          <Text style={styles.validEmail}>{email1}</Text>
        </View>
        <View>
          <View style={{...styles.imgEmail, ...{borderColor: passBcolor}}}>
            <TextInput
              placeholder="PASSWORD"
              style={{
                width: 312,
                //   backgroundColor: 'white',
              }}
              onChangeText={validatePass}
              secureTextEntry={show}
            />

            <View
              style={{
                alignSelf: 'center',
                marginBottom: 2,
                marginHorizontal: 5,
              }}>
              <TouchableOpacity onPress={showPassword}>
                {/* <View
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    height: 10,
                    alignSelf: 'flex-end',
                    // backgroundColor: 'pink',
                  }}> */}

                {show ? (
                  <Image
                    style={{width: 25, height: 20}}
                    source={showpass}></Image>
                ) : (
                  <Image
                    style={{width: 25, height: 20}}
                    source={hidepass}></Image>
                )}
                {/* </View> */}
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.validEmail}>{pass1}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('forgot');
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '70%',
          }}>
          <Text>Forgot Password?</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => login()}>
        <View
          style={{
            borderWidth: 2,
            // borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 150,
            backgroundColor: 'black',
            marginTop: 10,
          }}>
          <Text style={{color: 'white'}}>LOGIN</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttons}>
        {/* <View>
            <Pressable onPress={() => register(mail, password)}>
              <Text style={styles.text}>Sign-Up</Text>
            </Pressable>
          </View> */}

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={{width: '100%', textAlign: 'center'}}>
              OR CONNECT WITH
            </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            //   backgroundColor: 'red',
            width: '100%',
          }}>
          <TouchableOpacity onPress={onFacebookButtonPress}>
            <View
              style={{
                borderWidth: 2,
                borderRadius: 20,
                // paddingVertical: 10,
                // paddingHorizontal: 50,
                width: 180,
                height: 50,
                backgroundColor: 'skyblue',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  marginHorizontal: 30,
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={facebook}></Image>
              </View>
              <View>
                <Text>Facebook</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onGoogleButtonPress}>
            <View
              style={{
                borderWidth: 2,
                borderRadius: 20,
                // paddingVertical: 10,
                // paddingHorizontal: 60,
                width: 180,
                height: 50,

                backgroundColor: 'skyblue',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  marginHorizontal: 30,
                }}>
                <Image style={{width: 20, height: 20}} source={google}></Image>
              </View>
              <View style={{alignSelf: 'center'}}>
                <Text>Google</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('phone')}>
          <View
            style={{
              borderWidth: 2,
              borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 60,
              marginTop: 10,
              backgroundColor: 'skyblue',
            }}>
            <Text>Sign With Phone Number</Text>
          </View>
        </TouchableOpacity>
        {/* <Text onPress={logout}>logout</Text> */}

        {/* <View>
            <View>
              <Text>Login with phoneNumber</Text>
            </View>
          </View> */}
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text>Dont have a account?REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  emailView: {
    flex: 0.75,

    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  email: {
    borderWidth: 2,
    // borderBottomWidth: 2,
    width: 350,
  },
  buttons: {
    flex: 1,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  imgEmail: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    borderWidth: 2,
    // width: 350,
    // borderBottomWidth: 2,
    // backgroundColor: 'blue',

    // alignContent: 'flex-start',
  },
  validEmail: {
    color: 'red',
  },
});
