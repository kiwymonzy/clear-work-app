// repositories/AuthRepository.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthProvider from '../providers/AuthProvider';
import User from '../Models/user';
import LoginModel from '../Models/LoginModel';
import RegisterModel from '../Models/RegisterModel';
import BusinessConfig from '../Models/BusinessConfig'; // Import the BusinessConfig model

class AuthRepository {
  static async login(credentials) {
    try {
      const response = await AuthProvider.login(credentials);
      if (response.response_code === 'auth_login_200') {
        const loginUser = LoginModel.fromJson(response);
        //console.log("________________________");
        //console.log(loginUser.content.token);
        //console.log("________________________");
        await AsyncStorage.setItem('userToken', loginUser.content.token); // Adjust as needed
        return loginUser;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('AuthRepository login error:', error);
      throw error;
    }
  }

  static async register(credentials) {
    try {
      const response = await AuthProvider.register(credentials);
      if (response.response_code === 'registration_200') {
        //console.log("here");
        const registeredUser = RegisterModel.fromJson(response);
        return registeredUser;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('AuthRepository register error:', error);
      throw error;
    }
  }

  static async getToken() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      //console.log("________________________");
      //console.log(token);
      //console.log("________________________");
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      throw error;
    }
  }

  static async getBusinessConfig() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await AuthProvider.getBusinessConfig(token);
      if (response.response_code === 'default_200') {
        const businessConfig = BusinessConfig.fromJson(response);
        //console.log(businessConfig.content.business_name);
        return businessConfig;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('AuthRepository getBusinessConfig error:', error);
      throw error;
    }
  }
}

export default AuthRepository;
