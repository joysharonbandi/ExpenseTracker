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
  Animated,
  Easing,
} from 'react-native';
import React, {useState} from 'react';
import database from '@react-native-firebase/database';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';

import plus from '../assests/add.png';
import {disabled} from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import {useContext, useEffect} from 'react';
import {UserContext} from '../App';
import {counter, isObjectEmpty, mainFun} from '../src/Function';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Graph from '../src/components/graph/graph';
import ProgressBar from '../src/components/ProgressBar';
import {Models} from '../src/Model/FirebaseModel';
import Loader from '../src/components/Loader';
export default function Dashboard({navigation}) {
  const {
    obj,
    setObj,
    recent,
    setRecent,
    totalSum,
    setTotal,
    credit,
    setCredit,
    user,
  } = useContext(UserContext);
  const [modalVisable, setModalVisable] = useState(false);
  const [grocery, setGrocery] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  let spinValue = new Animated.Value(0);

  // First set up animation
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 100,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  //

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

  // const cost = counter('5 - 7 - 2022', 'grocery', obj) | 0;
  // const li = mainFun(obj);
  //
  //

  const getData = async () => {
    // const newData = await Models.totalData.getTotalData(user.uid);
    // const recentData = await Models.recentData.getRecentData(user.uid);
    // const Amount = await Models.totalData.getTotalAmount(user.uid);
    // setLoading(false);
    setLoading(true);

    await database()
      .ref(user.uid + '/' + 'data')
      .on('value', snapshot => {
        {
          setObj(snapshot.val());

          return snapshot.val();
        }
      });
    const d = await database()
      .ref(user.uid + '/' + 'recent')
      .on('value', snapshot => {
        {
          setRecent(snapshot.val());

          return snapshot.val();
        }
      });

    await database()
      .ref(user.uid + '/' + 'total')
      .on('value', snapshot => {
        setTotal(snapshot.val()?.newSum);
        setCredit(snapshot.val()?.newCredit);
        return snapshot.val();
      });

    // const value = await AsyncStorage.getItem('@storage_Key');
    // const value1 = await AsyncStorage.getItem('@storage_Key1');
    // const totalAmount = await AsyncStorage.getItem('totalAmount');
    // const credit = await AsyncStorage.getItem('credit');
    // const a = JSON.parse(value);
    // const recentObj = JSON.parse(value1);

    setLoading(false);

    //
    // if (newData != null) {
    //   setObj(newData);
    // }
    // if (recentData != null) {
    //   setRecent(recentData);
    // }
    // if (totalSum != null) {
    //   setTotal(JSON.parse(totalAmount));
    // }
    // if (credit != null) {
    //   setCredit(JSON.parse(credit));
    // }
  };

  useEffect(() => {
    getData();
    // setData(mainFun(obj));
  }, []);
  //

  useEffect(() => {
    // if (obj) {
    //   const grocery = counter('grocery', obj);
    //   setGrocery(grocery);
    //   // var movies = counter('Movies', obj);
    //   //
    //   //
    // }
    setData(mainFun(obj));
  }, [obj]);

  //
  console.log(JSON.stringify(obj));
  return (
    <View style={styles.main}>
      {loading && <Loader transparent={false} />}

      <View style={{flex: 0.45}}>
        <Graph
          everyDayDetails={{
            array: {
              data,
            },
          }}
        />
      </View>

      <Modal transparent={true} visible={modalVisable}>
        <TouchableOpacity
          onPress={() => {
            setModalVisable(!modalVisable);
          }}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: '#000000aa',
          }}>
          <View
            style={{
              alignSelf: 'flex-end',
              width: 200,
              height: 200,
              // backgroundColor: 'green',
              borderRadius: 10,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-around',
                // backgroundColor: 'white',
                borderColor: 'blue',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddExpense');
                  setModalVisable(!modalVisable);
                }}>
                <Text style={{fontSize: 20, color: 'white'}}>
                  1.Add expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{fontSize: 20, color: 'white'}}>
                  2.Make payment
                </Text>
              </TouchableOpacity>

              <Text style={{fontSize: 20, color: 'white'}}>3.Create group</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setModalVisable(!modalVisable);
              }}>
              <View
                style={{
                  position: 'absolute',
                  bottom: 60,
                  right: 5,
                  backgroundColor: 'white',
                  borderRadius: 40,
                }}>
                <Animated.Image
                  source={plus}
                  style={{
                    width: 45,
                    height: 45,
                    transform: [{rotate: spin}],
                  }}></Animated.Image>
              </View>
            </TouchableOpacity>
          </View>

          {/* </View> */}
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity
        style={{paddingHorizontal: 10}}
        onPress={() => {
          navigation.navigate('TotalDetails', {totalSum, credit});
        }}>
        <Text>Total Amount Available</Text>
        {/* <ProgressBarAndroidBase /> */}
        {/* <Progress.Bar
          progress={0.9}
          width={null}
          height={10}
          animated={true}
          indeterminateAnimationDuration={1000}
          // indeterminate={true}
          animationType={'spring'}
        /> */}
        <ProgressBar total={totalSum} credit={credit} />
        <Text>{credit - totalSum || 0}</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 0.56,
          borderRadius: 20,
          borderBottomWidth: 0,
          padding: 10,
          margin: 10,
          backgroundColor: 'white',
        }}>
        <Text style={{fontSize: 35}}>Recent</Text>
        {(recent === null || recent === []) && (
          <Text style={{alignSelf: 'center', fontSize: 20, marginTop: 50}}>
            Add the first expense
          </Text>
        )}

        <FlatList
          data={recent || []}
          renderItem={({item, index}) => {
            if (item === null) {
              return null;
            } else {
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
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
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
      <View style={{position: 'absolute', bottom: 10, right: 5}}>
        <TouchableOpacity
          onPress={() => {
            setModalVisable(true);
          }}>
          {
            <Animated.Image
              source={plus}
              style={{
                width: 45,
                height: 45,
                transform: [{rotate: spin}],
              }}></Animated.Image>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ededed',
    // backgroundColor: 'pink',
    // justifyContent: 'flex-end',
  },
});
