/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import MainStack from './src/navigation/Stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import GlobalState from './src/Context';
import FlashMessage from 'react-native-flash-message';

function App(): React.JSX.Element {

  const first = () => {
    SplashScreen.hide();
  }
  useEffect(() => {
    first()
  }, [])

  return (
    <NavigationContainer>
      <GlobalState>
        <MainStack />
        <FlashMessage />
      </GlobalState>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
