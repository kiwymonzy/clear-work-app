// repositories/AuthRepository.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import BannerProvider from '../providers/BannerProvider';
import User from '../Models/user';
import BannerContentModel from '../Models/BannerContentModel';
import BusinessConfig from '../Models/BusinessConfig'; // Import the BusinessConfig model

class BannerRepository {
  static async getToken() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      //console.log("________________________");
      //console.log(token);
      //console.log("________________________");
      return token;
    } catch (error) {
      navigation.replace('Login');
      console.error('Error retrieving token:', error);
      throw error;
    }
  }

  static async index(params) {
    try {
      const response = await BannerProvider.index(this.getToken(), params);
      if (response.response_code === 'default_200') {
        const banners = BannerContentModel.fromJson(response);
        //console.log("________________________");
        //console.log(banners.content.data);
        //console.log("________________________");
        return banners;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('BannerRepository index error:', error);
      throw error;
    }
  }
}

export default BannerRepository;
