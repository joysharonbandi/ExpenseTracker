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
import {counter, mainFun} from '../src/Function';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Graph from '../src/components/graph/graph';
import ProgressBar from '../src/components/ProgressBar';
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
  } = useContext(UserContext);
  const [modalVisable, setModalVisable] = useState(false);
  const [grocery, setGrocery] = useState(0);
  const [data, setData] = useState({});
  console.log({data});
  // console.log(data, 'datat');

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
  // console.log({cost});
  // console.log(grocery);

  const getData = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');
    const value1 = await AsyncStorage.getItem('@storage_Key1');
    const totalAmount = await AsyncStorage.getItem('totalAmount');
    const credit = await AsyncStorage.getItem('credit');
    const a = JSON.parse(value);
    const recentObj = JSON.parse(value1);

    // console.log(a);
    if (value != null) {
      setObj(a);
    }
    if (value1 != null) {
      setRecent(recentObj);
    }
    if (totalSum != null) {
      setTotal(JSON.parse(totalAmount));
    }
    if (credit != null) {
      setCredit(JSON.parse(credit));
    }
  };

  useEffect(() => {
    getData();
    // setData(mainFun(obj));
  }, []);
  // console.log(JSON.stringify(obj));

  useEffect(() => {
    // if (obj) {
    //   const grocery = counter('grocery', obj);
    //   setGrocery(grocery);
    //   // var movies = counter('Movies', obj);
    //   // console.log(obj);
    //   // console.log(recent);
    // }
    setData(mainFun(obj));
  }, [obj]);

  // console.log({data});
  return (
    <View style={styles.main}>
      {/* <View>
        <Text>Bezier Line Chart</Text> */}
      <View style={{flex: 0.45}}>
        <Graph
          everyDayDetails={{
            array: {
              data,
            },
          }}
        />
      </View>
      {/* <LineChart
          data={{
            labels: ['Grocery', 'Movies'],
            datasets: [
              {
                data: [grocery, 0],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={10} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        /> */}
      {/* <PieChart
          data={data}
          // width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[10, 50]}
          absolute
        /> */}
      {/* </View> */}
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
          {/* <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: '#000000aa',
            // backgroundColor: 'black',
          }}> */}

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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MakePayment');
                  setModalVisable(!modalVisable);
                }}>
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
                  bottom: 10,
                  right: 0,
                  backgroundColor: 'white',
                  borderRadius: 40,
                }}>
                <Image source={plus} style={{width: 45, height: 45}}></Image>
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
        <Text>{totalSum}</Text>
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

        <FlatList
          data={recent}
          renderItem={item => {
            console.log(item.item.paymentType);
            return (
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  marginBottom: 10,
                  borderRadius: 20,
                  // borderWidth: 1,
                  // borderColor: 'black',
                  backgroundColor:
                    colors[item['item']['category']] || colors['paymentType'],
                }}
                onPress={() => {
                  navigation.navigate('Details', item.item);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text>
                    {unicodes[item['item']['category']] || unicodes.paymentType}
                  </Text>
                  {item.item.paymentType === 'debit' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text>{item['item']['category']}</Text>
                    </View>
                  ) : (
                    <Text>Credit</Text>
                  )}

                  <Text>{item['item']['spendings']}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{position: 'absolute', bottom: 10, right: 0}}>
        <TouchableOpacity
          onPress={() => {
            setModalVisable(true);
          }}>
          {<Image source={plus} style={{width: 45, height: 45}}></Image>}
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
