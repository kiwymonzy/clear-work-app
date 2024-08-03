import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './components/Navigation/Tabs';
import { SettingScreen, RegisterScreen, LoginScreen, MyCart, OldHome, ProductInfo } from './components/Screens';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        //console.log(location);
      }
    }
    getLocation();
  }, []);

  if (!fontsLoaded) {
    return null; // You can also return a loading spinner here
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#F96D41',
          },
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen name="OldHome" component={OldHome} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
