import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {date} from '../src/Function';
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Details({route}) {
  const data = route.params;

  const date = new Date(data.date);
  //   console.log(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`);
  const calenderDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  // console.log(data, 'datata');
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
          console.log(data[item]);
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
});
