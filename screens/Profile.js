import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {UserContext} from '../App';
import auth from '@react-native-firebase/auth';
import Loader from '../src/components/Loader';

export default function Profile({navigation}) {
  const {user, setUser} = useContext(UserContext);
  const [phone, setPhone] = useState(user?.phoneNumber);
  const [name, setName] = useState(auth().currentUser?.displayName);
  const [loader, setLoader] = useState(false);

  const updateProfile = async () => {
    setLoader(true);
    const update = {
      displayName: name,
    };

    const data = await auth().currentUser.updateProfile(update);
    setLoader(false);
  };
  return (
    <View style={styles.container}>
      {loader && <Loader />}
      <View style={styles.ImageView}>
        <Image
          style={styles.ProfileImage}
          source={require('../assests/person.png')}></Image>
      </View>
      <View style={styles.fieldView}>
        <View style={styles.InputField}>
          <TextInput
            style={styles.TextInput}
            placeholder={'Name'}
            value={name}
            onChangeText={e => {
              setName(e);
            }}
          />
          <Image />
        </View>
        <View style={styles.InputField}>
          <TextInput
            style={styles.TextInput}
            placeholder={'Phone-Number'}
            value={phone}
            editable={false}
          />
          <Image />
        </View>
        <TouchableOpacity onPress={() => updateProfile()}>
          <View style={styles.button}>
            <Text style={{alignSelf: 'center'}}>EDIT</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // navigation.push('phone');
            auth()
              .signOut()
              .then(() => {
                setUser(null);
                navigation.push('phone');
              });
          }}>
          <View
            style={{
              ...styles.button,

              // marginHorizontal: 50,
              //   backgroundColor: '#42224A',
              borderRadius: 0,
              marginTop: 50,
            }}>
            <Text style={{alignSelf: 'center'}}>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  innerView: {
    flex: 1,
    // justifyContent: 'fle',
    alignItems: 'center',
    marginHorizontal: 25,
    backgroundColor: 'red',
  },
  ImageView: {
    flex: 0.6,
    // backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },

  ProfileImage: {
    width: 50,
    height: 50,
  },
  fieldView: {
    flex: 0.4,
    // justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 200,
    // alignItems: 'center',
    // backgroundColor: 'black',
  },
  InputField: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 25,
  },
  TextInput: {
    backgroundColor: '#DCDCDC',
    width: '100%',
    padding: 0,
    height: 30,
    paddingLeft: 10,
  },
  button: {
    borderWidth: 2,
    // borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginHorizontal: 10,
    //   backgroundColor: 'black',
    marginTop: 10,
    // padding: 20,
    backgroundColor: 'lightcyan',
    borderRadius: 10,
  },
});
