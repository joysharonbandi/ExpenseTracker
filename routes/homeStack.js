import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/dashboard';
import AddExpense from '../screens/addExpense';
import MakePayment from '../screens/MakePayment';

const Stack = createNativeStackNavigator();
export default function homeStack() {
  return (
    // <View>
    //   <Text>homeStack</Text>
    // </View>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddExpense" component={AddExpense} />
        <Stack.Screen name="MakePayment" component={MakePayment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
