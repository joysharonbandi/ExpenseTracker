import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  ProgressBarAndroidBase,
} from 'react-native';
import React, {useState} from 'react';
import database from '@react-native-firebase/database';

function DropDown({
  text,
  selectedValue,
  arr = [],
  onchange,
  initialValue,
  user,
}) {
  const [value, setValue] = useState('');
  const [visable, setVisable] = useState(false);
  const [categoryVisable, setcategoryVisable] = useState(false);
  const [input, setInput] = useState('');
  const [array, setArr] = useState([]);
  // let tempArr = [...arr];

  //   const getCategories = async () => {
  //     await database()
  //       .ref(user.uid + '/' + 'categories')
  //       .on('value', snapshot => {
  //         {
  //           // setObj(snapshot.val());
  //           console.log(snapshot.val(), 'kkk');
  //           if (snapshot.val()) {
  //             setArr(prev => {
  //               return [...arr, ...Object.values(snapshot.val())];
  //             });
  //           }

  //           return snapshot.val();
  //         }
  //       });
  //   };

  //   useEffect(() => {
  //     const fun = async () => {
  //       getCategories();
  //     };
  //     fun();
  //   }, []);

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
      </View>
      {visable && (
        <View style={{width: '100%', backgroundColor: 'grey', height: 150}}>
          <TouchableOpacity
            onPress={() => {
              setcategoryVisable(true);
            }}>
            <Text style={{fontSize: 18}}>Add Category+</Text>
          </TouchableOpacity>
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
                  onchange(item.value);
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
