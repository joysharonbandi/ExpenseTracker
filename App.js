import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Dashboard from './screens/dashboard';
import PaymentDetails from './screens/PaymentDetails';
import HomeStack from './routes/homeStack';
import {createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UserContext = createContext({});
export default function App() {
  const [data, setData] = useState({});
  const [obj, setObj] = useState({});
  const [recent, setRecent] = useState([]);
  const [input, setInput] = useState('');
  const [input1, setInput1] = useState('');
  const [graphData, setGraph] = useState('');
  const [totalSum, setTotal] = useState(0);
  const [credit, setCredit] = useState(0);

  return (
    <UserContext.Provider
      value={{
        credit,
        setCredit,
        totalSum,
        setTotal,
        obj,
        setObj,
        data,
        setData,
        recent,
        setRecent,
        input,
        input1,
        setInput,
        setInput1,
        graphData,
        setGraph,
      }}>
      <HomeStack />
    </UserContext.Provider>
    // <HomeStack />
    // <PaymentDetails />
  );
}
