// repositories/AuthRepository.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryProvider from '../providers/CategoryProvider';
import User from '../Models/user';
import CategoryModel from '../Models/CategoryModel';
import BusinessConfig from '../Models/BusinessConfig'; // Import the BusinessConfig model

class CategoryRepository {
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
      const response = await CategoryProvider.index(this.getToken(), params);
      if (response.response_code === 'default_200') {
        const banners = CategoryModel.fromJson(response);
        //console.log("________________________");
        //console.log(banners.content.data);
        //console.log("________________________");
        return banners;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('CategoryRepository index error:', error);
      throw error;
    }
  }
}

export default CategoryRepository;
