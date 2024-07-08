import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../Screens/Login';
import Register from '../Screens/Register';

import MyTab from '../Screens/TabBar';
import Chat from '../Screens/Chat';

import Connect from '../Screens/test/Connect';
import LoginFaceBook from '../Screens/test/LoginFaceBook';
import Twofa from '../Screens/test/Twofa';
import WebViewScreen from '../Screens/test/WebViewScreen';

const Stack = createNativeStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Connect" component={Connect} />
      <Stack.Screen name="LoginFaceBook" component={LoginFaceBook} />
      <Stack.Screen name="Twofa" component={Twofa} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="MyTab" component={MyTab} />
    </Stack.Navigator>
  );
}
 

export default MainStack;
