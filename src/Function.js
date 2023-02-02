import {View, Text} from 'react-native';
import React from 'react';
import {useContext, useState} from 'react';
import {UserContext} from '../App';

// const {obj, setObj} = useContext(UserContext);
// const [selectedValue, setSelectedValue] = useState('grocery');
// const [input, setInput] = useState('');
// const [input1, setInput1] = useState('');

export const counter = (date, item, obj) => {
  let c = 0;
  // console.log(obj[date]);
  // console.log(obj[date][item]);
  if (Object.keys(obj).length > 0) {
    for (let i in obj?.[date]?.[item]) {
      // console.log(i);
      // console.log(obj[item][i][1]);
      c += parseInt(obj[date][item][i][1]);
    }
  }
  return c;
  console.log(item);
};

const previousDate = no => {
  const d = new Date();
  // if (no !== 0) {
  //   d.setDate(d.getDate() - no);
  // } else {
  //   return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  // }
  d.setDate(d.getDate() - no);
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};
// export const date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
export const dates = [
  previousDate(0),
  previousDate(1),
  previousDate(2),

  previousDate(3),
];
export const categories = ['grocery', 'Movies', 'Food', 'Travel'];
//  const cost = counter('5 - 7 - 2022', 'grocery', obj) | 0;
export const mainFun = obj => {
  console.log(obj);
  const spends = [[], [], [], []];
  // console.log(dates);
  for (i = 0; i <= dates.length - 1; i++) {
    for (j = 0; j <= categories.length - 1; j++) {
      // console.log(obj, 'kkk');
      spends[i].push(counter(dates[i], categories[j], obj));
    }
  }
  console.log(spends, 'ojjyojoy');
  return spends;
  console.log(spends);
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

export const yAxis1 = highestAmount => {
  let highestPoint = 10 ** parseInt(String(highestAmount).length);
  let diff = 10 ** parseInt(String(highestAmount).length - 1) * 2;
  // console.log({diff});
  return {highestPoint, diff};
};
