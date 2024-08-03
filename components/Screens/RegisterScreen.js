import React, { useState, useEffect } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthRepository from '../Repositories/AuthRepository';
import { COLORS } from '../Utls';
import CountryPicker from 'react-native-country-picker-modal';
import Config from './../Utls/Config';

const RegisterScreen = ({ navigation }) => {
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm_password, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('TZ'); // Default country code
  const [callingCode, setCallingCode] = useState('+255'); // Default calling code

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

  const handleRegister = async () => {
    setLoading(true);
    try {
      const credentials = {
        first_name,
        last_name,
        phone: `${callingCode}${phone}`, // Format the phone number with calling code
        email,
        gender,
        password,
        confirm_password,
      };
      const registeredUser = await AuthRepository.register(credentials);
      setError(registeredUser.message);
      setData(registeredUser);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.containerHeader}>
        <Text style={styles.headerTitle}>SIGN UP</Text>
      </SafeAreaView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' || Platform.OS === 'android' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' || Platform.OS === 'android' ? 10 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.containerForm}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="Enter First Name"
              style={styles.input}
              onChangeText={(text) =>
                setFirstName(
                  text.charAt(0).toUpperCase() +
                    text.slice(1).toLowerCase().trim()
                )
              }
              value={first_name}
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Enter Last Name"
              style={styles.input}
              onChangeText={(text) =>
                setLastName(
                  text.charAt(0).toUpperCase() +
                    text.slice(1).toLowerCase().trim()
                )
              }
              value={last_name}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter Email"
              style={styles.input}
              onChangeText={(text) => setEmail(text.toLowerCase().trim())}
              value={email}
            />

            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.phoneInputContainer}>
              <CountryPicker
                withFilter
                withFlag
                withCountryNameButton
                withAlphaFilter
                withCallingCode
                onSelect={(country) => {
                  setCountryCode(country.cca2);
                  setCallingCode('+' + country.callingCode[0]);
                }}
                containerButtonStyle={styles.countryPicker}
                countryCode={countryCode}
              />
              <TextInput
                placeholder="Enter Mobile Number"
                style={[styles.input, styles.phoneInput]}
                keyboardType="phone-pad"
                onChangeText={(text) => {
                  // Remove leading zero if present
                  const formattedText = text.startsWith('0')
                    ? text.slice(1)
                    : text;
                  setPhone(formattedText);
                }}
                value={phone}
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter Password"
              secureTextEntry={true}
              style={styles.input}
              onChangeText={setPassword}
              value={password}
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              placeholder="Enter Confirm Password"
              secureTextEntry={true}
              style={styles.input}
              onChangeText={setConfirmPassword}
              value={confirm_password}
            />

            <Text style={styles.label}>Gender</Text>
            <RadioButton.Group
              onValueChange={(value) => setGender(value)}
              value={gender}>
              <View style={styles.radioGroup}>
                <View style={styles.radioOption}>
                  <RadioButton
                    value="male"
                    color={COLORS.green}
                    status={gender === 'male' ? 'checked' : 'unchecked'}
                  />
                  <Text style={styles.radioLabel}>Male</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton
                    value="female"
                    color={COLORS.green}
                    status={gender === 'female' ? 'checked' : 'unchecked'}
                  />
                  <Text style={styles.radioLabel}>Female</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton
                    value="other"
                    color={COLORS.green}
                    status={gender === 'other' ? 'checked' : 'unchecked'}
                  />
                  <Text style={styles.radioLabel}>Other</Text>
                </View>
              </View>
            </RadioButton.Group>

            {isVisible && error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.textButton}>REGISTER</Text>
              )}
            </TouchableOpacity>

            <View style={styles.row}>
              <Text>You have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Sign in</Text>
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  countryPicker: {
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
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
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default RegisterScreen;
