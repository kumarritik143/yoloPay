/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import * as React from "react"
import PaymentScreen from './src/paymentScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return ( 
      <PaymentScreen />
  );
}


export default App;

