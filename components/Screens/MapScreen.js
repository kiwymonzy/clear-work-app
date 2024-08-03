// components/Screens/SettingScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AuthRepository from '../Repositories/AuthRepository';
import BusinessConfig from '../Models/BusinessConfig';
import { COLORS } from '../Utls';

const MapScreen = () => {
  return (
    <SafeAreaView style={{ alignContent:'center', justifyContent: 'center', flex: 1, backgroundColor: COLORS.khak }}>
      <Text style={{ textAlign:'center', fontWeight: "bold", fontSize: 50}}>MAP HERE</Text>
    </SafeAreaView>
  );
};

export default MapScreen;
