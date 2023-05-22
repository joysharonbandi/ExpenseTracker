import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {date} from '../src/Function';
import {Models} from '../src/Model/FirebaseModel';
import {UserContext} from '../App';
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Details({route, navigation}) {
  const {data, index} = route.params;

  const {user, totalSum, credit} = useContext(UserContext);
  const date = new Date(data.date);
  //
  const calenderDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  const deleteHandler = () => {
    if (data.paymentType === 'debit') {
      Models.totalData.deleteData(
        user.uid,
        calenderDate,
        data.category,
        data.date,
      );
      Models.recentData.deleteRecent(user.uid, index);
    } else {
      Models.totalData.deleteData(
        user.uid,
        calenderDate,
        data.paymentType,
        data.date,
      );
      Models.recentData.deleteRecent(user.uid, index);
    }

    const newSum =
      data.paymentType === 'debit'
        ? parseInt(totalSum) - parseInt(data.spendings)
        : parseInt(totalSum);

    const newCredit =
      data.paymentType === 'credit'
        ? parseInt(credit) - parseInt(data.spendings)
        : parseInt(credit);

    Models.totalData.addAmountData(user.uid, {newSum, newCredit});
    navigation.goBack();
  };
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
        Details
      </Text>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 10,
        }}>
        {Object.keys(data).map(item => {
          return (
            <View>
              {item === 'spendings' && data['paymentType'] === 'credit' ? (
                <Text style={{fontWeight: '500', fontSize: 20}}>
                  Credited Amount
                </Text>
              ) : (
                <Text style={{fontWeight: '500', fontSize: 20}}>
                  {capitalizeFirstLetter(item)}
                </Text>
              )}
              {item === 'date' ? (
                <Text>{calenderDate}</Text>
              ) : (
                <Text>{data[item]}</Text>
              )}
            </View>
          );
        })}

        <TouchableOpacity
          onPress={() => {
            deleteHandler();
          }}>
          <View
            style={{
              ...styles.button,

              // backgroundColor: '#42224A',
              borderRadius: 0,
              marginTop: 50,
            }}>
            <Text style={{alignSelf: 'center'}}> Delete</Text>
          </View>
        </TouchableOpacity>
        {/* <View>
          <Text style={{fontWeight: '500', fontSize: 20}}>Category</Text>
          <Text>{data.category}</Text>
        </View>
        <View>
          <Text style={{fontWeight: '500', fontSize: 20}}>Date</Text>
          <Text>{calenderDate}</Text>
        </View>
        <View>
          <Text style={{fontWeight: '500', fontSize: 20}}>Spendings</Text>
          <Text>{data.spendings}</Text>
        </View> */}
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
  button: {
    borderWidth: 2,
    // borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginHorizontal: 10,
    //   backgroundColor: 'black',
    marginTop: 10,
    // padding: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
});
