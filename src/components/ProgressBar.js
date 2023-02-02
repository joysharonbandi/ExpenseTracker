import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function ProgressBar({total, credit}) {
  console.log(total, credit);
  const max = credit;
  const spend = credit - total;
  const percent = (spend / max) * 100;
  let outerContainerPercent = 0;

  let innerContainerPercent = (70 * percent) / 100;
  if (spend >= max) {
    innerContainerPercent = 70;
    outerContainerPercent = 20;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.innerContainer,
          width: `${innerContainerPercent}%`,
        }}>
        {spend >= max && (
          <View style={styles.border}>
            <View style={styles.line}></View>
            <Text style={{position: 'absolute', top: 20, left: -100}}>
              Max Point:{credit}
            </Text>
          </View>
        )}
      </View>

      <View
        style={{
          ...styles.outerContainer,
          width: `${outerContainerPercent}%`,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: '100%',
    height: 20,
    borderRadius: 20,
    flexDirection: 'row',
  },
  innerContainer: {
    backgroundColor: 'cyan',
    width: '70%',
    height: 17,
    borderRadius: 10,
    flexDirection: 'row',
  },
  border: {
    // position: 'relative',
    position: 'absolute',
    right: 0,
    // backgroundColor: 'blue',
    // width: 100,
    height: 25,
    // left: 0,
  },
  line: {
    borderWidth: 1,
    height: 25,
    // left: -20,
    right: 20,
    width: 0,

    position: 'absolute',
  },
  outerContainer: {
    backgroundColor: '#EA4C46',
    width: '40%',
    height: 17,
    borderRadius: 10,
    // position: 'absolute',
    left: -20,
  },
});
