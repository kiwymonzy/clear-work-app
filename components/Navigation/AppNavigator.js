// navigation/AppNavigator.js or similar
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SettingScreen,
  RegisterScreen,
  LoginScreen,
  MyCart,
  ProductInfo,
  LoadingScreen,
  BusinessConfigScreen,
  ServiceScreen,
  CategoryScreen,
} from './../Screens';
import Tabs from './Tabs';
const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: '#F96D41',
      },
    }}
    initialRouteName="Loading">
    <Stack.Screen name="Loading" component={LoadingScreen} />
    <Stack.Screen name="BusinessConfig" component={BusinessConfigScreen} />
    <Stack.Screen name="Home" component={Tabs} />
    <Stack.Screen name="Settings" component={SettingScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="MyCart" component={MyCart} />
    <Stack.Screen name="ProductInfo" component={ProductInfo} />
    <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
    <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
  </Stack.Navigator>
);
//    <NavigationContainer theme={theme}>
export default AppNavigator;
