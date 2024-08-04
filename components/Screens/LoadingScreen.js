// screens/LoadingScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import AuthRepository from '../Repositories/AuthRepository';
import CategoryRepository from '../Repositories/CategoryRepository';
import ServiceRepository from '../Repositories/ServiceRepository';

import { useBusinessConfig } from '../../context/BusinessConfigContext';
import { COLORS, images } from '../Utls';

const { width } = Dimensions.get('window');

const LoadingScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const { setBusinessConfig } = useBusinessConfig();
  const { setServices } = useBusinessConfig();
  const { setCategories } = useBusinessConfig();
  const { setTrendingServices }= useBusinessConfig();

  useEffect(() => {
    const fetchBusinessConfig = async () => {
      try {
        const params = {
          limit: 10,
          offset: 1,
        };
        const config = await AuthRepository.getBusinessConfig();
        const services = await ServiceRepository.index(params);
        const trends = await ServiceRepository.trending({limit: 2,offset: 1});
        const categories = await CategoryRepository.index(params);
        setBusinessConfig(config);
        setServices(services);
        setTrendingServices(trends);
        setCategories(categories)

        setTimeout(() => {
          navigation.replace('Home'); // Navigate to the Home screen with a delay for the animation
        }, 3000); // 3 seconds delay
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBusinessConfig();
  }, [navigation, setBusinessConfig, setServices, setCategories, setTrendingServices]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/*  
          <Image
        source={images.apartment} // Replace with your company logo
        style={styles.logo}
      />
      */}
      <LottieView
        source={require('../../assets/loading.json')} // Replace with your Lottie animation
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.khak,
  },
  logo: {
    width: width * 0.6, // 60% of the screen width
    height: width * 0.6, // 60% of the screen width
    resizeMode: 'contain',
    marginBottom: 20,
  },
  animation: {
    width: width * 0.5, // 50% of the screen width
    height: width * 0.5, // 50% of the screen width
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default LoadingScreen;
