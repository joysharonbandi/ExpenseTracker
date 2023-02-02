import {View, Text, StyleSheet, NativeModules, Dimensions} from 'react-native';
import React, {useState, useContext} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import LottieView from 'lottie-react-native';

import {UserContext} from '../App';
import {style} from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
export default function QRcode({route, navigation}) {
  const UPI = NativeModules.UPI;
  console.log(route.params);
  const [reactiv, setReactiv] = useState();
  const [res, setRes] = useState('');
  const {obj, setObj, input1, setInput1, input, setInput} =
    useContext(UserContext);
  console.log(input, input1);
  const openLink = async e => {
    console.log(e.data);
    // let {amount} = this.state;
    try {
      let UpiUrl =
        'upi://pay?pa=Q04965953@ybl&tr=kdahskjahs27575fsdfasdas&am=' +
        1 +
        '&mam=null&cu=INR&url=https://MyUPIApp&refUrl=https://MyUPIApp';
      let response = await UPI.openLink(e.data);
      console.log(response);
      console.log(response.split('&Status'));
      let res = response.split('&Status');
      console.log(res);
      if (res[1] == '=SUCCESS' || res[1] == '=FAILURE') {
        navigation.navigate('PaymentDetails', {obj: route.params});
      }

      //however you want to handle response
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{width: '100%', height: '50%', backgroundColor: 'pink'}}>
      <QRCodeScanner
        // cameraTimeout={100}\
        reactivateTimeout={1}
        showMarker
        ref={node => {
          // console.log(node.reactivate(), 'kkii')
          setReactiv(node);
        }}
        reactivate={true}
        customMarker={
          <View
            style={{
              height: '100%',
              width: '100%',
            }}>
            <Text
              style={{
                backgroundColor: '#000000aa',
                width: '100%',
                height: '30%',
                alignSelf: 'flex-end',
                textAlign: 'center',
                fontSize: 25,
                color: 'white',
              }}>
              Scan the QRcode
            </Text>
            <View
              style={{
                // backgroundColor: 'transparent',
                // borderWidth: 1,
                height: '47%',
                width: '100%',
                flexDirection: 'row',
                // backgroundColor: 'pink',
              }}>
              <View
                style={{
                  width: '25%',
                  backgroundColor: '#000000aa',

                  // width: '100%',
                  // height: '100%',
                }}
              />
              <View
                style={{
                  width: '50%',
                  // backgroundColor: 'black',
                  // paddingVertical: 1000,
                  // borderRadius: 100,

                  // borderColor: 'blue',
                }}>
                <LottieView
                  source={require('../assests/4692-scanner.json')}
                  autoPlay
                  loop
                  style={{width: '100%', alignSelf: 'center'}}
                />
              </View>
              <View
                style={{
                  width: '25%',
                  backgroundColor: '#000000aa',

                  // width: '100%',
                  // height: '100%',
                }}
              />
            </View>
            <Text
              style={{
                backgroundColor: '#000000aa',
                width: '100%',
                height: '36%',
                // marginTop: 10,
                // borderWidth: 10,
              }}></Text>
          </View>
        }
        reactivateTimeout={10}
        onRead={openLink}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        cameraStyle={styles.camera}
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
    //
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
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    // flex: 1,
    // height: 250,
    // width: 250,
    // alignSelf: 'center',
    // // marginTop: 80,
    // // marginBottom: 100,
    // backgroundColor: 'pink',
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
