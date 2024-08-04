// repositories/AuthRepository.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServiceProvider from '../providers/ServiceProvider';
import User from '../Models/user';
import ServiceModel from '../Models/ServiceModel';
import BusinessConfig from '../Models/BusinessConfig'; // Import the BusinessConfig model

class ServiceRepository {
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

  static async index(params) {
    try {
      const response = await ServiceProvider.index(this.getToken(), params);
      if (response.response_code === 'default_200') {
        const services = ServiceModel.fromJson(response);
        //console.log("________________________");
        //console.log(services.content.data);
        //console.log("________________________");
        return services;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('ServiceRepository index error:', error);
      throw error;
    }
  }


    static async trending(params) {
    try {
      const response = await ServiceProvider.trending(this.getToken(), params);
      if (response.response_code === 'default_200') {
        const trends = ServiceModel.fromJson(response);
        //console.log("________________________");
        //console.log(trends.content.data);
        //console.log("________________________");
        return trends;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('ServiceRepository index error:', error);
      throw error;
    }
  }
}

export default ServiceRepository;
