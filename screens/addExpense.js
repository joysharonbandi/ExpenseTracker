import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useContext} from 'react';
import {UserContext} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import {Models} from '../src/Model/FirebaseModel';

function DropDown({
  text,
  selectedValue,
  arr = [],
  onchange,
  initialValue,
  user,
  type,
}) {
  const [value, setValue] = useState('');
  const [visable, setVisable] = useState(false);
  const [categoryVisable, setcategoryVisable] = useState(false);
  const [input, setInput] = useState('');
  const [array, setArr] = useState([]);
  // let tempArr = [...arr];

  const getCategories = async () => {
    await database()
      .ref(user.uid + '/' + 'categories')
      .on('value', snapshot => {
        {
          // setObj(snapshot.val());
          console.log(snapshot.val(), 'kkk');
          if (snapshot.val()) {
            setArr(prev => {
              return [...arr, ...Object.values(snapshot.val())];
            });
          }

          return snapshot.val();
        }
      });
  };

  console.log(type);

  useEffect(() => {
    const fun = async () => {
      getCategories();
    };
    if (type !== 'payment') {
      fun();
    } else {
      setArr(arr);
    }
  }, []);
  console.log(array);
  return (
    <>
      <View style={{borderBottomWidth: 2}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
          }}>
          {text}
        </Text>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
            setVisable(!visable);
            setcategoryVisable(false);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: '500'}}>
            {value.label || value}
          </Text>
          <Image
            source={require('../assests/drop-down.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        {/* <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: '100%'}}
          enabled={true}
          mode={'dropdown'}
          onValueChange={(itemValue, itemIndex) => onchange(itemValue)}>
          {arr.map(item => (
            <Picker.Item label={item.label} value={item.value} />
          ))}

          <View
            style={{backgroundColor: 'red', position: 'absolute', bottom: 0}}>
            <Text>Add Picker</Text>
          </View>
        </Picker> */}
      </View>
      {visable && (
        <View style={{width: '100%', backgroundColor: 'grey', height: 150}}>
          {type !== 'payment' && (
            <TouchableOpacity
              onPress={() => {
                setcategoryVisable(true);
              }}>
              <Text style={{fontSize: 18}}>Add Category+</Text>
            </TouchableOpacity>
          )}
          {categoryVisable && (
            <View style={{marginHorizontal: 10}}>
              <TextInput
                style={{borderBottomWidth: 2, width: '100%', color: 'black'}}
                placeholder="Add New Category"
                onChangeText={val => {
                  setInput(val);
                }}></TextInput>
              <TouchableOpacity
                onPress={() => {
                  console.log('inside');

                  Models.totalData.addCategory(user.uid, input);
                  setcategoryVisable(false);
                }}
                // disabled={validator()}
                style={{
                  marginTop: 20,
                  padding: 15,
                  backgroundColor: 'lightcyan',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // opacity: validator() ? 0.2 : 1,
                }}>
                <Text>Add Category</Text>
              </TouchableOpacity>
            </View>
          )}

          <ScrollView>
            {array.map(item => (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
                onPress={() => {
                  setValue(item);
                  onchange(item.value || item);
                  setVisable(false);
                }}>
                <Text style={{fontSize: 18}}>{item.label || item}</Text>
              </TouchableOpacity>
              // <Picker.Item label={item.label} value={item.value} />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
}
export default function AddExpense({navigation}) {
  const {
    obj,
    setObj,
    recent,
    setRecent,
    setTotal,
    credit,
    setCredit,
    user,
    totalSum,
  } = useContext(UserContext);

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

  // const totalSum = useMemo(async () => {
  //   const totalAmount = await AsyncStorage.getItem('totalAmount');

  //   if (totalAmount === null) {
  //     return 0;
  //   }

  //   const parsedObj = JSON.parse(totalAmount);

  //   return parsedObj;
  // }, []);

  const Submit = async () => {
    const d = new Date();
    const key =
      d.getDate() + '-' + (Number(d.getMonth()) + 1) + '-' + d.getFullYear();

    // const key = '5 - 7 - 2022';
    // if (obj[[key]] === undefined) {
    //   obj[[key]] = {};
    // }
    //

    const newSum =
      paymentType === 'debit'
        ? parseInt(totalSum || 0) + parseInt(input1)
        : parseInt(totalSum || 0);

    const newCredit =
      paymentType === 'credit'
        ? parseInt(credit || 0) + parseInt(input1)
        : parseInt(credit);

    setTotal(newSum);
    setCredit(newCredit);
    Models.totalData.addAmountData(user.uid, {newSum, newCredit});

    // const category = obj[[key]];
    const date = new Date();
    const str = date.getTime();

    //
    // if (paymentType === 'credit') {
    // } else if (category[[selectedValue]] == undefined) {
    //
    //   category[[selectedValue]] = {};
    // }
    // let obj1 = {};
    // if (paymentType === 'debit') {
    //
    //   obj1 = category[[selectedValue]];
    // } else {
    //   obj1 = paymentType;
    // }
    //
    // Object.assign(obj1, {[str]: [input, input1]});

    // setObj({...obj});
    if (paymentType === 'credit') {
      Models.totalData.addTotalData(user.uid, key, paymentType, str, [
        input,
        input1,
      ]);
    } else {
      Models.totalData.addTotalData(user.uid, key, selectedValue, str, [
        input,
        input1,
      ]);
    }

    paymentType === 'debit'
      ? setRecent(
          [
            ...(recent || []),
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
            ...(recent || []),
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
      ? Models.recentData.addTransaction(user.uid, [
          ...(recent || []),
          {
            paymentType: paymentType,
            description: input,
            spendings: input1,
            date: str,
            category: selectedValue,
          },
        ])
      : Models.recentData.addTransaction(user.uid, [
          ...(recent || []),
          {
            paymentType: paymentType,
            description: input,
            spendings: input1,
            date: str,
          },
        ]);

    navigation.navigate('Home');
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
          user={user}
          type={'payment'}
        />
        {paymentType === 'debit' && (
          <DropDown
            text="Category"
            onchange={e => {
              console.log(e, 'aa');
              setSelectedValue(e);
            }}
            arr={[
              {label: 'grocery', value: 'grocery'},
              {label: 'Movies', value: 'Movies'},
              {label: 'Food', value: 'Food'},
              {label: 'Travel', value: 'Travel'},
            ]}
            selectedValue={selectedValue}
            user={user}
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
          style={{borderBottomWidth: 2, width: '100%', color: 'black'}}
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
          style={{borderBottomWidth: 2, width: '100%', color: 'black'}}
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
