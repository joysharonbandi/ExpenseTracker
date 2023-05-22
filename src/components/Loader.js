import {
  View,
  Text,
  Modal,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';

export default function Loader({transparent = true}) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={transparent}
        visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          //   setModalVisible(!modalVisible);
        }}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              //   backgroundColor: 'black',
              marginHorizontal: 140,
              borderRadius: 10,
              padding: 15,
            }}>
            <ActivityIndicator size={'large'} color={'black'} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
});
