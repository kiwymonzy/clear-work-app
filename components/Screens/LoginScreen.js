import React, { useState, useEffect } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthRepository from '../Repositories/AuthRepository';
import * as Crypto from 'expo-crypto';
import { COLORS } from '../Utls/Theme';
import Config from './../Utls/Config';

const LoginScreen = ({ navigation }) => {
  const [email_or_phone, setEmailOrPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AuthRepository.getToken();
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  const generateAndStoreUUID = async () => {
    const uuid = Crypto.randomUUID();
    console.log(uuid);
    await AsyncStorage.setItem('guest_id', uuid);
    return uuid;
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      let guest_id = await AsyncStorage.getItem('guest_id');
      if (!guest_id) {
        guest_id = await generateAndStoreUUID();
      }
      const credentials = { guest_id, email_or_phone, password };
      const loggedInUser = await AuthRepository.login(credentials);
      setData(loggedInUser);
      setError(loggedInUser.message);
      setToken(loggedInUser.content.token); // Adjust as needed
      //console.log(loggedInUser.content.token);
      if (loggedInUser.content.token) { // Check if the login was successful
        navigation.replace('Home'); // Navigate to Home page
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.containerHeader}>
        <Text style={styles.headerTitle}>LOGIN</Text>
      </SafeAreaView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' || Platform.OS === 'android' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' || Platform.OS === 'android' ? 10 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.containerForm}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter Email"
              style={styles.input}
              onChangeText={(text) => setEmailOrPhone(text.toLowerCase().trim())}
              value={email_or_phone}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter Password"
              secureTextEntry={true}
              style={styles.input}
              onChangeText={setPassword}
              value={password}
            />
            {isVisible && error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.textButton}>LOGIN</Text>
              )}
            </TouchableOpacity>
            <View style={styles.row}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.replace('Register')}>
                <Text style={styles.link}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.khak,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 36,
    fontWeight: 'bold',
  },
  containerHeader: {
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 90,
    borderBottomLeftRadius: 90,
    paddingVertical: 20,
    height: 200,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: COLORS.secondary,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  containerForm: {
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: COLORS.bgRed,
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    height: 50,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.green,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  textButton: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default LoginScreen;

