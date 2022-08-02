import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Picker} from '@react-native-picker/picker';
import {UserContext} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function MakePayment() {
  const {obj, setObj} = useContext(UserContext);
  const [selectedValue, setSelectedValue] = useState('grocery');
  const [input, setInput] = useState('');
  const [input1, setInput1] = useState('');
  const [reactiv, setReactiv] = useState();

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
      Linking.openURL(url).then(e => console.log(e));
    }
  };
  // console.log(reactiv.reactivate());
  // useEffect(() => {
  //   if (reactiv) {
  //     reactiv.reactivate();
  //     console.log(reactiv);
  //   }
  // }, [reactiv]);
  return (
    <View
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{flex: 0.5}}>
        <QRCodeScanner
          ref={node => {
            // console.log(node.reactivate(), 'kkii')
            setReactiv(node);
          }}
          reactivate={true}
          reactivateTimeout={10}
          onRead={onSuccess}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          cameraStyle={styles.camera}
          cameraContainerStyle={
            <View>
              <Text>jyjyjejy</Text>
            </View>
          }
          // topContent={
          //   <Text style={styles.centerText}>
          //     Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>{' '}
          //     on your computer and scan the QR code.
          //   </Text>
          // }
          // bottomContent={
          //   <View style={{flex: 2, justifyContent: 'space-between'}}>
          //     <View style={{borderWidth: 1}}>
          //       <Picker
          //         selectedValue={selectedValue}
          //         style={{height: 50, width: 200}}
          //         enabled={true}
          //         mode={'dropdown'}
          //         onValueChange={(itemValue, itemIndex) =>
          //           setSelectedValue(itemValue)
          //         }>
          //         <Picker.Item label="grocery" value="grocery" />
          //         <Picker.Item label="Movies" value="Movies" />
          //         <Picker.Item label="Food" value="Food" />
          //         <Picker.Item label="Travel" value="Travel" />
          //       </Picker>
          //     </View>
          //     <View style={styles.inputbox1}>
          //       <TextInput
          //         style={{borderWidth: 2, width: 200}}
          //         placeholder="description"
          //         onChangeText={val => {
          //           setInput(val);
          //         }}></TextInput>
          //     </View>
          //     <View style={styles.inputbox2}>
          //       <TextInput
          //         keyboardType="numeric"
          //         style={{borderWidth: 2, width: 200}}
          //         placeholder="Enter Money"
          //         onChangeText={val => {
          //           setInput1(val);
          //         }}></TextInput>
          //     </View>
          //     <View style={{flex: 0.5}}>
          //       <TouchableOpacity
          //         onPress={() => {
          //           setReactiv(true);
          //         }}>
          //         <View>
          //           <Text>Submit</Text>
          //         </View>
          //       </TouchableOpacity>
          //     </View>
          //   </View>
        />
      </View>
      <View style={{flex: 0.25}}>
        <View style={{borderWidth: 1, width: 200}}>
          <Picker
            selectedValue={selectedValue}
            style={{height: 50, width: 200}}
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
      </View>
      <View style={styles.inputbox1}>
        <TextInput
          style={{borderWidth: 2, width: 200}}
          placeholder="description"
          onChangeText={val => {
            setInput(val);
          }}></TextInput>
      </View>
      <View style={styles.inputbox2}>
        <TextInput
          keyboardType="numeric"
          style={{borderWidth: 2, width: 200}}
          placeholder="Enter Money"
          onChangeText={val => {
            setInput1(val);
          }}></TextInput>
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
