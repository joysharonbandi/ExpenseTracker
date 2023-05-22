import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function Test({blue}) {
  //
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([
      {color: 'lightblue', height: blue[0]},
      {color: '#F07470', height: blue[1]},
      {color: 'yellow', height: blue[2]},
      {color: 'lightgreen', height: blue[3]},
      //
      // {color: 'violet', height: blue[4]},
    ]);
  }, [blue]);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        marginHorizontal: 10,
      }}>
      {data.map((element, index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: element.color,
              flex: 0.2,
              marginRight: 5,
              height: element.height,
              alignSelf: 'flex-end',
            }}></View>
        );
      })}
    </View>
  );
}
