import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useContext} from 'react';
import {UserContext} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddExpense() {
  var c = 0;
  const {obj, setObj, recent, setRecent} = useContext(UserContext);
  const [selectedValue, setSelectedValue] = useState('grocery');
  const [input, setInput] = useState('');
  const [input1, setInput1] = useState('');

  // const [obj, setObj] = useState({});

  const Submit = () => {
    const d = new Date();
    if (obj[[selectedValue]] == undefined) {
      obj[[selectedValue]] = {};
    }
    setRecent([
      ...recent,
      {
        category: selectedValue,
        description: input,
        spendings: input1,
      },
    ]);
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
      console.log('aa', jsonValue);
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

  return (
    <View style={styles.container}>
      <View style={{flex: 0.25}}>
        <View style={{borderWidth: 1}}>
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

      <View style={{flex: 0.5}}>
        <TouchableOpacity onPress={Submit}>
          <View>
            <Text>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  inputbox1: {
    flex: 0.25,
  },
  inputbox2: {
    flex: 0.25,
  },
});
