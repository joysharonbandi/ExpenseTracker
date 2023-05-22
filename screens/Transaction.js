import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../App';

export default function Transaction({navigation}) {
  const {
    obj,
    setObj,
    recent,
    setRecent,
    totalSum,
    setTotal,
    credit,
    setCredit,
  } = useContext(UserContext);
  const unicodes = {
    grocery: '🛒',
    Movies: '🎥',
    Food: '🍔',
    Travel: '🚆',
    paymentType: '💸',
  };
  const colors = {
    grocery: 'lightblue',
    Movies: '#F07470',
    Food: 'yellow',
    Travel: 'lightgreen',
    paymentType: 'green',
  };

  const sort = () => {
    const newArr =
      recent ||
      [].sort((a, b) => {
        if (!(a === null || b === null)) {
          const d = new Date(a.date);
          const d1 = new Date(b.date);

          if (d < d1) {
            return 1;
          }
          if (d > d1) {
            return -1;
          } else {
            return 0;
          }
        }
      });

    return newArr;
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
        Previous Transactions
      </Text>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 10,
        }}>
        {(recent === null || recent === []) && (
          <Text style={{alignSelf: 'center', fontSize: 20, marginTop: 50}}>
            No Transactions
          </Text>
        )}
        <FlatList
          data={sort()}
          renderItem={({item, index}) => {
            if (item === null) {
              return null;
            } else {
              const n = new Date(item.date);

              return (
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    marginBottom: 10,
                    borderRadius: 20,
                    // borderWidth: 1,
                    // borderColor: 'black',
                    backgroundColor:
                      colors[item['category']] || colors['paymentType'],
                  }}
                  onPress={() => {
                    navigation.navigate('Details', {
                      data: item,
                      index: index,
                    });
                  }}>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Text style={{alignSelf: 'center', marginLeft: 5}}>
                      {n.toLocaleString()}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        flex: 1,
                      }}>
                      <Text>
                        {unicodes[item['category']] || unicodes.paymentType}
                      </Text>
                      {item.paymentType === 'debit' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text>{item['category']}</Text>
                        </View>
                      ) : (
                        <Text>Credit</Text>
                      )}

                      <Text>{item['spendings']}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
          }}
        />
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
