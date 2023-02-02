import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function TotalDetails({route}) {
  const {credit, totalSum} = route.params;
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
        Total
      </Text>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 10,
        }}>
        <View>
          <View style={styles.horizontalView}>
            <Text style={{fontWeight: '500', fontSize: 20}}>
              Total Credited Amount:
            </Text>

            <Text style={{fontWeight: '500', fontSize: 20}}>{credit}</Text>
          </View>
          <View style={styles.horizontalView}>
            <Text style={{fontWeight: '500', fontSize: 20}}>
              Total Expenses:
            </Text>

            <Text style={styles.text}>{credit - totalSum}</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.horizontalView}>
          <Text style={{fontWeight: '500', fontSize: 20}}>
            Total Available:
          </Text>

          <Text style={styles.text}>{totalSum}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42224A',
  },
  line: {
    borderWidth: 1,
    marginTop: 10,
  },

  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between',
  },

  text: {fontWeight: '500', fontSize: 20},
});
