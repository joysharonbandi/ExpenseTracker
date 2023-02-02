import {View, Text, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import Test from './test';
import {yAxis1} from '../../Function';
import {dates} from '../../Function';
export default function Graph({everyDayDetails}) {
  // console.log(JSON.stringify(everyDayDetails), 'kkkk');
  const [yAxis, setYaxis] = useState([]);
  const [heights, setHeights] = useState([
    ['50%', '20%', '30%', '40%'],
    ['100%', '20%', '30%', '40%'],
    ['100%', '20%', '30%', '40%'],
    ['100%', '20%', '30%', '40%'],
  ]);

  // console.log('hii', everyDayDetails.array['data']);
  const highestAmount1 = () => {
    let max = 0;
    for (i = 0; i <= everyDayDetails.array['data'].length - 1; i++) {
      if (Math.max(...everyDayDetails.array['data'][i]) > max) {
        max = Math.max(...everyDayDetails.array['data'][i]);
      }
      // console.log(Math.max(...everyDayDetails.array['data'][i]));
    }
    return max;
  };
  useEffect(() => {
    let highestAmount = everyDayDetails.highestAmount;
    // console.log('joy', highestAmount1());

    // let highestAmount =highestAmount1()
    let tempList = [];
    let tempList1 = [];
    let a = highestAmount1();
    let highestPoint = yAxis1(a)['highestPoint'];
    let diff = yAxis1(a)['diff'];

    // console.log(everyDayDetails.array['data'].length);
    for (i = 0; i <= everyDayDetails.array['data'].length - 1; i++) {
      let t = [];
      for (j = 0; j <= everyDayDetails.array['data'][i].length - 1; j++) {
        if (
          everyDayDetails.array['data'][i][j] != 0 &&
          !tempList1.includes(everyDayDetails.array['data'][i][j])
        ) {
        }
        t.push(
          `${(everyDayDetails.array['data'][i][j] / highestPoint) * 100}%`,
        );
      }
      tempList1.push(t);
    }

    setHeights(tempList1);

    while (highestPoint) {
      tempList.push(highestPoint);

      highestPoint -= diff;
    }
    tempList.push(0);
    setYaxis([...tempList]);
    highestAmount1();
  }, [everyDayDetails]);

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 20,
        borderBottomWidth: 0,
        padding: 10,
        margin: 10,
        backgroundColor: '#42224A',
      }}>
      {yAxis.map((element, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              ...{flex: index === 0 ? 0 : 1},
              alignItems: 'flex-end',
            }}>
            <View style={{flex: 0.2}}>
              <Text style={{textAlign: 'center', fontSize: 16, color: 'white'}}>
                {element}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: 'white',
              }}
            />
          </View>
        );
      })}
      <View
        style={{
          height: 20,
        }}
      />
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          marginLeft: 65,
          top: 20,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 10,
          marginBottom: 0,
        }}>
        {heights.map((element, index) => {
          return (
            <View style={{flex: 1}}>
              <Test blue={element} key={index} />
              <Text
                style={{
                  marginVertical: 8,
                  marginHorizontal: 10,
                  color: 'white',
                  fontSize: 10,
                }}>
                {dates[index]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
