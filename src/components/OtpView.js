import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function OtpView({text, onPress}) {
  const isBoxActive = index => {
    return index <= text.length - 1;
  };

  const boxNumber = index => {
    return index <= text.length - 1 ? text.charAt(index) : '';
  };
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
      onPress={onPress}>
      {[0, 1, 2, 3, 4, 5].map(num => {
        return (
          <View
            style={{
              ...styles.box,
              borderColor: isBoxActive(num) ? 'lightgreen' : 'black',
            }}>
            <Text>{boxNumber(num)}</Text>
          </View>
        );
      })}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 32,
    height: 32,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 5,
  },
});
