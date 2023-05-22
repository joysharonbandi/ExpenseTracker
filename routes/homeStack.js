import {View, Text, Image} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/dashboard';
import AddExpense from '../screens/addExpense';
import MakePayment from '../screens/MakePayment';
import QRcode from '../screens/QRcode';
import PaymentDetails from '../screens/PaymentDetails';
import Details from '../screens/Details';
import TotalDetails from '../screens/TotalDetails';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Transaction from '../screens/Transaction';
import Login from '../screens/Login';
import PhoneLogin from '../screens/PhoneLogin';
import Profile from '../screens/Profile';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function homeStack() {
  return (
    // <View>
    //   <Text>homeStack</Text>
    // </View>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="login" component={Login} /> */}
        <Stack.Screen
          name="phone"
          component={PhoneLogin}
          options={{headerShown: 'true'}}
        />
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="AddExpense" component={AddExpense} />
        <Stack.Screen name="MakePayment" component={MakePayment} />
        <Stack.Screen name="QRcode" component={QRcode} />
        <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="TotalDetails" component={TotalDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarIcon: ({}) => {
          let iconName = '';
          if (route.name === 'DashBoard') {
            iconName = require('../assests/dashboard.png');
          }
          if (route.name === 'Transaction') {
            iconName = require('../assests/transaction.png');
          }
          if (route.name === 'Profile') {
            iconName = require('../assests/person.png');
          }
          return <Image source={iconName} style={{width: 25, height: 25}} />;
        },
      })}>
      <Tab.Screen name="DashBoard" component={Dashboard} />
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
