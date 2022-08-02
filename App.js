import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Dashboard from './screens/dashboard';
import HomeStack from './routes/homeStack';
import {createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UserContext = createContext({});
export default function App() {
  const [data, setData] = useState({});
  const [obj, setObj] = useState({});
  const [recent, setRecent] = useState([]);

  return (
    <UserContext.Provider
      value={{obj, setObj, data, setData, recent, setRecent}}>
      <HomeStack />
    </UserContext.Provider>
    // <HomeStack />
  );
}
