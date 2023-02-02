import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  TextInput,
  Alert,
  NativeModules,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Picker} from '@react-native-picker/picker';
import {UserContext} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function MakePayment({navigation}) {
  const {obj, setObj, input1, setInput1, input, setInput} =
    useContext(UserContext);
  const [selectedValue, setSelectedValue] = useState('grocery');

  const [reactiv, setReactiv] = useState();
  const UPI = NativeModules.UPI;

  // const [obj, setObj] = useState({});

  const Submit = () => {
    const d = new Date();
    if (obj[[selectedValue]] == undefined) {
      obj[[selectedValue]] = {};
    }

    const k = obj[[selectedValue]];
    // console.log('ji', obj[[selectedValue]]);
    const obj1 = {};

    const str =
      d.getDate() +
      '-' +
      d.getHours() +
      '-' +
      d.getMinutes() +
      +'-' +
      d.getSeconds() +
      '-';
    // console.log(
    //   d.getDate() +
    //     '-' +
    //     d.getHours() +
    //     '-' +
    //     d.getMinutes() +
    //     +'-' +
    //     d.getSeconds() +
    //     '-',
    // );

    // k[[str]] = [input, input1];
    // obj[[selectedValue]][str] = [input, input1];
    // console.log(obj);
    // setObj({...obj, selectedValue:{...prevState.selectedValue,str:{
    //   ...p
    // }}});
    // obj1[str] = [input, input1];
    Object.assign(k, {[str]: [input, input1]});
    console.log(k);
    setObj({...obj});
    console.log(obj1);

    // setObj(prev => ({
    //   ...prev,
    //   selectedValue: {
    //     ...prev.selectedValue,
    //     [str]: {
    //       ...prev[selectedValue][str],
    //       input: [input, input1],
    //     },
    //   },
    // }));
  };
  console.log(obj);

  const storeData = async obj => {
    try {
      const jsonValue = JSON.stringify(obj);
      // console.log('aa', jsonValue);
      AsyncStorage.setItem('@storage_Key', jsonValue);
      // AsyncStorage.setItem('@storage_Key1', jsonValue1);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  useEffect(() => {
    if (obj) {
      storeData(obj);
    }
  }, [obj]);
  const onSuccess = e => {
    console.log('jjjjj', e.data.split('&mc'));
    console.log('hiii ${input1}');
    if (input1 == 0 || input == '') {
      setReactiv(true);
      Alert.alert('Every field should be filled');
    } else {
      var url =
        'paytmmp://' +
        'pay?pa=7013991532@paytm&mc=0000&tr=123456789ABCDEFG&tn=HelloWorld&am=1&cu=INR';
      console.log(e.data);
      // Linking.openURL(e.data + `&am=${input1}&cu=INR`).catch(
      //   err => console.error('An error occured', err),
      //   Submit(),
      // );
      // Linking.openURL(url).then(e => console.log(e));
      //
    }
  };
  // console.log(reactiv.reactivate());
  // useEffect(() => {
  //   if (reactiv) {
  //     reactiv.reactivate();
  //     console.log(reactiv);
  //   }
  // }, [reactiv]);

  const openLink = async () => {
    // let {amount} = this.state;
    try {
      let UpiUrl =
        'upi://pay?pa=7013991532@ybl&pn=dhaval&tr=kdahskjahs27575fsdfasdas&am=' +
        1 +
        '&mam=null&cu=INR&url=https://MyUPIApp&refUrl=https://MyUPIApp';
      let response = await UPI.openLink(UpiUrl);
      console.log(response); //however you want to handle response
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#42224A'}}>
      <Text
        style={{
          flex: 0.15,
          textAlignVertical: 'center',
          fontSize: 30,
          fontWeight: '500',
          color: 'white',
        }}>
        Make Payment
      </Text>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
          }}>
          category
        </Text>
        <View style={{borderBottomWidth: 2}}>
          <Picker
            selectedValue={selectedValue}
            style={{height: 50, width: '100%'}}
            enabled={true}
            mode={'dropdown'}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="grocery" value="grocery" />
            <Picker.Item label="Movies" value="Movies" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Travel" value="Travel" />
          </Picker>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginTop: 10,
            marginBottom: 5,
          }}>
          description
        </Text>
        <TextInput
          style={{borderBottomWidth: 2, width: '100%'}}
          placeholder="description"
          onChangeText={val => {
            setInput(val);
          }}></TextInput>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginTop: 10,
            marginBottom: 5,
          }}>
          Amount
        </Text>
        <TextInput
          keyboardType="numeric"
          style={{borderBottomWidth: 2, width: '100%'}}
          placeholder="Enter Money"
          onChangeText={val => {
            setInput1(val);
          }}></TextInput>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('QRcode', {
              selectedValue: selectedValue,
              input: input,
              input1: input1,
            });
          }}
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: 'lightcyan',
            borderRadius: 10,
          }}>
          <Text style={{textAlign: 'center', fontWeight: '500'}}>
            Continue to Pay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  camera: {
    flex: 0.25,
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginTop: 80,
    // marginBottom: 100,
    backgroundColor: 'pink',
  },
  inputbox1: {
    flex: 0.25,
  },
  inputbox2: {
    flex: 0.25,
  },
  main: {
    justifyContent: 'flex-start',
  },
});
