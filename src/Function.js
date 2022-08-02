import {View, Text} from 'react-native';
import React from 'react';
import {useContext, useState} from 'react';
import {UserContext} from '../App';

// const {obj, setObj} = useContext(UserContext);
// const [selectedValue, setSelectedValue] = useState('grocery');
// const [input, setInput] = useState('');
// const [input1, setInput1] = useState('');

export const counter = (item, obj) => {
  let c = 0;
  console.log(obj);
  for (let i in obj[item]) {
    console.log(obj[item][i][1]);
    c += parseInt(obj[item][i][1]);
  }
  return c;
  console.log(item);
};

// const storeData = async obj => {
//   try {
//     const jsonValue = JSON.stringify(obj);
//     console.log('aa', jsonValue);
//     AsyncStorage.setItem('@storage_Key', jsonValue);
//     // AsyncStorage.setItem('@storage_Key1', jsonValue1);
//   } catch (e) {
//     // saving error
//     console.log(e);
//   }
// };

// export const Submit = () => {
//   const d = new Date();
//   if (obj[[selectedValue]] == undefined) {
//     obj[[selectedValue]] = {};
//   }

//   const k = obj[[selectedValue]];
//   // console.log('ji', obj[[selectedValue]]);
//   const obj1 = {};

//   const str =
//     d.getDate() +
//     '-' +
//     d.getHours() +
//     '-' +
//     d.getMinutes() +
//     +'-' +
//     d.getSeconds() +
//     '-';

//   Object.assign(k, {[str]: [input, input1]});
//   console.log(k);
//   setObj({...obj});
//   console.log(obj1);
// };
