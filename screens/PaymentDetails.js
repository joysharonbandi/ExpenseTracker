import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {UserContext} from '../App';
import tick from '../assests/Paid.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function PaymentDetails({route, navigation}) {
  const {obj, setObj, recent, setRecent} = useContext(UserContext);
  const {selectedValue, input, input1} = route.params['obj'];

  const Submit = () => {
    const d = new Date();
    const key = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    // const key = '5 - 7 - 2022';
    if (obj[[key]] == undefined) {
      obj[[key]] = {};
    }

    const category = obj[[key]];
    const str =
      d.getDate() +
      '-' +
      d.getHours() +
      '-' +
      d.getMinutes() +
      +'-' +
      d.getSeconds() +
      '-';
    if (category[[selectedValue]] == undefined) {
      category[[selectedValue]] = {};
    }

    const obj1 = category[[selectedValue]];

    Object.assign(obj1, {[str]: [input, input1]});

    setObj({...obj});
    setRecent([
      ...recent,
      {
        category: selectedValue,
        description: input,
        spendings: input1,
      },
    ]);
  };

  const storeData = async obj => {
    try {
      const jsonValue = JSON.stringify(obj);
      const jsonValue1 = JSON.stringify(recent);

      AsyncStorage.setItem('@storage_Key', jsonValue);
      AsyncStorage.setItem('@storage_Key1', jsonValue1);
      // navigation.navigate('Dashboard');
      // AsyncStorage.setItem('@storage_Key1', jsonValue1);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    if (obj) {
      storeData(obj, recent);
    }
  }, [obj, recent]);
  useEffect(() => {
    Submit();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, margin: 10}}>Sent Successfully</Text>
      <View style={styles.success}>
        <Text style={{fontSize: 15}}>Amount</Text>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 10}}>
          $1
          <Image source={tick} style={{height: 25, width: 25}}></Image>
        </Text>

        <View style={{borderTopWidth: 1, margin: 10, borderColor: '#D3D3D3'}} />
        <View
          style={{
            // borderTopWidth: 1,
            margin: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 15}}>To</Text>
          <Text style={{fontSize: 20}}>NAME</Text>
          <Text style={{fontSize: 15}}> 123456@upi</Text>
        </View>
        <View style={{borderTopWidth: 1, margin: 10, borderColor: '#D3D3D3'}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // backgroundColor: 'blue',
  },
  success: {
    margin: 10,
    flex: 0.5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#D3D3D3',
  },
});
