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

import plus from '../assests/add.png';
import {disabled} from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import {useContext, useEffect} from 'react';
import {UserContext} from '../App';
import {counter} from '../src/Function';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Dashboard({navigation}) {
  const {obj, setObj, recent} = useContext(UserContext);
  const [modalVisable, setModalVisable] = useState(false);
  const [grocery, setGrocery] = useState(0);

  console.log(grocery);

  const getData = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');
    const a = JSON.parse(value);
    console.log(a);
    if (value != null) {
      setObj(a);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (obj) {
      const grocery = counter('grocery', obj);
      setGrocery(grocery);
      // var movies = counter('Movies', obj);
      console.log(obj);
      console.log(recent);
    }
  });
  console.log(grocery);
  return (
    <View style={styles.main}>
      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
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
        />
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
      <View style={{flex: 1}}>
        <Text style={{fontSize: 40}}>Recent</Text>

        <FlatList
          data={recent}
          renderItem={item => (
            <View>
              {console.log('inside', item['item'])}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text>{item['item']['category']}</Text>
                <Text>{item['item']['spendings']}</Text>
              </View>
            </View>
          )}
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
    // backgroundColor: 'pink',
    // justifyContent: 'flex-end',
  },
});
