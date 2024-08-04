import React from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, BusinessConfigScreen, SettingScreen, LoginScreen, MapScreen } from '../Screens';
import { COLORS, FONTS, icons } from '../Utls';

const Tab = createBottomTabNavigator();

const tabOptions = {
  showLabel: false,
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={tabOptions}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          paddingBottom: 10,
          paddingTop: 10,
          position: 'absolute',
          bottom: 20,
          height: 80,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          borderRadius: 35,
          borderWidth: 2,
          borderColor: COLORS.secondary,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 0,
        },
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.bgRed : COLORS.white;

          switch (route.name) {
            case 'Home':
              return (
                <View style={{ alignItems: 'center', justifyContent: 'space-between' ,maxWidth: 300 }}>
                  <Image
                    source={icons.home}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                  <Text style={{ ...FONTS.body4, color: tintColor }}>Home</Text>
                </View>
              );
            case 'Login':
              return (
                <View style={{ alignItems: 'center' , justifyContent: 'space-between',maxWidth: 300 }}>
                  <Image
                    source={icons.profile}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                  <Text style={{ ...FONTS.body4, color: tintColor }}>
                    Login
                  </Text>
                </View>
              );
            case 'Setting':
              return (
                <View style={{ alignItems: 'center', justifyContent: 'space-between',maxWidth: 300  }}>
                  <Image
                    source={icons.settings}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                  <Text style={{ ...FONTS.body4, color: tintColor }}>
                    Config
                  </Text>
                </View>
              );
            case 'Map':
              return (
                <View style={{ alignItems: 'center', justifyContent: 'space-between',maxWidth: 300   }}>
                  <Image
                    source={icons.map}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                  <Text style={{ ...FONTS.body4, color: tintColor }}>Map</Text>
                </View>
              );
          }
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Login',
        }}
      />
      <Tab.Screen
        name="Setting"
        component={BusinessConfigScreen}
        options={{
          tabBarLabel: 'Setting',
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
