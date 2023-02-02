import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useContext} from 'react';
import {UserContext} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DropDown({text, selectedValue, arr = [], onchange}) {
  return (
    <View style={{borderBottomWidth: 2}}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
        }}>
        {text}
      </Text>
      <Picker
        selectedValue={selectedValue}
        style={{height: 50, width: '100%'}}
        enabled={true}
        mode={'dropdown'}
        onValueChange={(itemValue, itemIndex) => onchange(itemValue)}>
        {arr.map(item => (
          <Picker.Item label={item.label} value={item.value} />
        ))}
        {/* <Picker.Item label="Credit" value="credit" />
        <Picker.Item label="Debit" value="debit" /> */}
      </Picker>
    </View>
  );
}
export default function AddExpense({navigation}) {
  const {obj, setObj, recent, setRecent, setTotal, credit, setCredit} =
    useContext(UserContext);

  const [selectedValue, setSelectedValue] = useState('grocery');
  const [paymentType, setPaymentType] = useState('credit');
  const [input, setInput] = useState('');
  const [input1, setInput1] = useState('');
  const validator = () => {
    if (input === '' || input1 === '') {
      return true;
    } else {
      return false;
    }
  };
  console.log(validator());
  const totalSum = useMemo(async () => {
    const totalAmount = await AsyncStorage.getItem('totalAmount');

    if (totalAmount === null) {
      return 0;
    }

    const parsedObj = JSON.parse(totalAmount);

    return parsedObj;
  }, []);

  useEffect(() => {
    console.log(
      totalSum.then(e => {
        console.log(e, 'jjjj');
      }),
    );
  }, []);

  const Submit = async () => {
    console.log('inside');
    const d = new Date();
    const key = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();

    // const key = '5 - 7 - 2022';
    if (obj[[key]] === undefined) {
      obj[[key]] = {};
    }
    console.log(await totalSum, 'awiat ');

    const newSum =
      paymentType === 'credit'
        ? parseInt(await totalSum) + parseInt(input1)
        : parseInt(await totalSum, 10) - parseInt(input1, 10);

    const newCredit =
      paymentType === 'credit'
        ? parseInt(credit) + parseInt(input1)
        : parseInt(credit);

    setTotal(newSum);
    setCredit(newCredit);

    const category = obj[[key]];
    const str = new Date();

    console.log(obj, 'obj print');
    if (paymentType === 'credit') {
    } else if (category[[selectedValue]] == undefined) {
      console.log('inside 2nd');
      category[[selectedValue]] = {};
    }
    let obj1 = {};
    if (paymentType === 'debit') {
      console.log(obj1, 'inside');
      obj1 = category[[selectedValue]];
    } else {
      obj1 = paymentType;
    }
    console.log(obj1, 'obj1');
    Object.assign(obj1, {[str]: [input, input1]});

    setObj({...obj});
    paymentType === 'debit'
      ? setRecent(
          [
            ...recent,
            {
              category: selectedValue,
              description: input,
              spendings: input1,
              date: str,
              paymentType: paymentType,
            },
          ],
          newSum,
        )
      : setRecent(
          [
            ...recent,
            {
              paymentType: paymentType,
              description: input,
              spendings: input1,
              date: str,
            },
          ],
          newSum,
        );
    paymentType === 'debit'
      ? storeData(
          obj,
          [
            ...recent,
            {
              category: selectedValue,
              description: input,
              spendings: input1,
              date: str,
              paymentType: paymentType,
            },
          ],
          newSum,
          newCredit,
        )
      : storeData(
          obj,
          [
            ...recent,
            {
              paymentType: paymentType,
              description: input,
              spendings: input1,
              date: str,
            },
          ],
          newSum,
          newCredit,
        );
    navigation.goBack();
  };

  const storeData = async (obj, recent, totalSum, credit) => {
    try {
      const jsonValue = JSON.stringify(obj);
      const jsonValue1 = JSON.stringify(recent);
      const jsonValue2 = JSON.stringify(totalSum);
      const jsonValue3 = JSON.stringify(credit);

      AsyncStorage.setItem('@storage_Key', jsonValue);
      AsyncStorage.setItem('@storage_Key1', jsonValue1);
      AsyncStorage.setItem('totalAmount', jsonValue2);
      AsyncStorage.setItem('credit', jsonValue3);
      // navigation.navigate('Dashboard');
      // AsyncStorage.setItem('@storage_Key1', jsonValue1);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  // useEffect(() => {
  //   if (obj) {
  //     storeData(obj, recent);
  //   }
  // }, [obj, recent]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          flex: 0.15,
          textAlignVertical: 'center',
          fontSize: 30,
          fontWeight: '500',
          color: 'white',
        }}>
        Add Expense
      </Text>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 10,
        }}>
        <DropDown
          text="Payment Type"
          onchange={e => {
            setPaymentType(e);
          }}
          arr={[
            {value: 'credit', label: 'Credit'},
            {value: 'debit', label: 'Debit'},
          ]}
          selectedValue={paymentType}
        />
        {paymentType === 'debit' && (
          <DropDown
            text="Category"
            onchange={e => {
              setSelectedValue(e);
            }}
            arr={[
              {label: 'grocery', value: 'grocery'},
              {label: 'Movies', value: 'Movies'},
              {label: 'Food', value: 'Food'},
              {label: 'Travel', value: 'Travel'},
            ]}
            selectedValue={selectedValue}
          />
        )}
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
          onPress={Submit}
          disabled={validator()}
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: 'lightcyan',
            borderRadius: 10,
            opacity: validator() ? 0.2 : 1,
          }}>
          <Text style={{textAlign: 'center', fontWeight: '500'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42224A',
  },
  inputbox1: {
    flex: 0.25,
  },
  inputbox2: {
    flex: 0.25,
  },
});
