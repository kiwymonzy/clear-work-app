import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Platform, StyleSheet } from 'react-native';
import AppNavigator from './components/Navigation/AppNavigator';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import { BusinessConfigProvider } from './context/BusinessConfigContext';
import { COLORS } from './components/Utls';
import * as ScreenOrientation from 'expo-screen-orientation';
import CartScreen from './components/Screens/CartScreen';

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
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
    // Lock orientation to portrait
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  if (!fontsLoaded) {
    return null; // You can also return a loading spinner here
  }

  return (
    <NavigationContainer theme={theme}>
      <View style={styles.safeArea}>
        <BusinessConfigProvider>
          <View style={styles.container}>
            <CartScreen />
          </View>
        </BusinessConfigProvider>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.khak,
  },
  container: {
    flex: 1,
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    width: '100%',
    alignSelf: 'center',
  },
});
