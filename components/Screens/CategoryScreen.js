import React, { useState, useEffect, useRef, memo } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONTS, SIZES, icons, images } from '../Utls';
import Config from './../Utls/Config';
import { Items } from '../Database/Database';
import ServiceRepository from '../Repositories/ServiceRepository';

const LineDivider = () => (
  <View style={{ width: 1, paddingVertical: 35 }}>
    <View
      style={{
        flex: 1,
        borderLeftColor: COLORS.lightGray,
        borderLeftWidth: 1,
      }}></View>
  </View>
);

const RestaurantItem = memo(({ item, navigation, getCategoryNameById }) => {
  return (
    <TouchableOpacity
      style={{ marginBottom: SIZES.padding * 2 }}
      onPress={() => navigation.navigate('', { item })}
    >
      <View style={{ marginBottom: SIZES.padding }}>
        <Image
          source={item.photo}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
            borderRadius: SIZES.radius,
          }}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 50,
            width: SIZES.width * 0.3,
            backgroundColor: COLORS.white,
            borderTopRightRadius: SIZES.radius,
            borderBottomLeftRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            ...styles.shadow,
          }}>
          <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
        </View>
      </View>

      <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

      <View style={{ marginTop: SIZES.padding, flexDirection: 'row' }}>
        <Image
          source={icons.star}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.primary,
            marginRight: 10,
          }}
        />
        <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
          {item.categories.map((categoryId) => (
            <View style={{ flexDirection: 'row' }} key={categoryId}>
              <Text style={{ ...FONTS.body3 }}>
                {getCategoryNameById(categoryId)}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
            </View>
          ))}

          {[1, 2, 3].map((priceRating) => (
            <Text
              key={priceRating}
              style={{
                ...FONTS.body3,
                color:
                  priceRating <= item.priceRating
                    ? COLORS.black
                    : COLORS.darkgray,
              }}>
              $
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default function HomeScreen({ navigation }) {
  const route = useRoute();
  const flatListRef = useRef(null); // Create a ref for FlatList
  const [isListRendered, setIsListRendered] = useState(false); // Track if FlatList is rendered

  const initialCurrentLocation = {
    streetName: 'Sinza, Dar-es-Salaam',
    gps: {
      latitude: -6.7779867,
      longitude: 39.2212281,
    },
  };

  const [title, setTitle] = useState("All");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [originalRestaurants, setOriginalRestaurants] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation);
  const [hasScrolled, setHasScrolled] = useState(false); // Flag to ensure scrolling happens only once

  useEffect(() => {
    const handleServiceList = async () => {
      try {
        const params = {
          limit: 200,
          offset: 1,
        };
        const services = await ServiceRepository.index(params);

        if (services.response_code === 'default_200') {
          const uniqueCategoryIds = new Set();
          const transformedCategories = [];
          const transformedRestaurants = [];

          services.content.data.forEach((item) => {
            if (!uniqueCategoryIds.has(item.category.id)) {
              uniqueCategoryIds.add(item.category.id);
              transformedCategories.push({
                id: item.category.id,
                name: item.category.name,
                icon: { uri: item.category.image_full_path },
              });
            }

            transformedRestaurants.push({
              id: item.id,
              name: item.name,
              rating: item.rating_count,
              categories: Array.isArray(item.category.id)
                ? item.category.id
                : [item.category.id],
              priceRating: 'affordable',
              photo: { uri: item.thumbnail_full_path },
              duration: '30 - 45 min',
              location: { latitude: -6.77611, longitude: 39.22468 },
            });
          });

          setCategories(transformedCategories);
          setOriginalRestaurants(transformedRestaurants);
          setRestaurants(transformedRestaurants);
        } else {
          setError(services.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    handleServiceList();
  }, []);

  useEffect(() => {
    // Get category ID from route params
    const { categoryId } = route.params || {};
    
    if (categoryId) {
      // Find the selected category by ID
      const category = categories.find(cat => cat.id === categoryId);
      if (category) {
        setTitle(category.name); // Update title to the selected category name
        setSelectedCategory(category);

        const filteredRestaurants = originalRestaurants.filter((restaurant) =>
          restaurant.categories.includes(category.id)
        );
        setRestaurants(filteredRestaurants);
      }
    } else {
      setTitle("All");
      setRestaurants(originalRestaurants);
      setSelectedCategory(null);
    }
  }, [route.params, categories, originalRestaurants]);

useEffect(() => {
  // Only set up interval if not scrolled yet
  if (isListRendered && selectedCategory && !hasScrolled) {
    const interval = setInterval(() => {
      // Scroll to the selected category
      flatListRef.current?.scrollToIndex({
        index: categories.findIndex(cat => cat.id === selectedCategory.id),
        animated: false,
        viewPosition: 0.4, // Adjust to control the alignment of the item in the view
      });
      
      // Set the flag to true to prevent further scrolling
      setHasScrolled(true);
      
      // Clear the interval
      clearInterval(interval);
    }, 200); // Delay of 1 second (1000 milliseconds)

    // Cleanup interval on unmount or when dependencies change
    return () => clearInterval(interval);
  }
}, [isListRendered, selectedCategory, categories, hasScrolled]);


  function onSelectCategory(category) {
    setSelectedCategory(category);
    setTitle(category.name);
    const filteredRestaurants = originalRestaurants.filter((restaurant) =>
      restaurant.categories.includes(category.id)
    );
    setRestaurants(filteredRestaurants);
  }

  function getCategoryNameById(id) {
    const category = categories.find((a) => a.id === id);
    return category ? category.name : '';
  }

  function renderMainCategories() {
        const renderRow = ({ item }) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            marginBottom: SIZES.radius,
            alignItems: 'center', // Center items vertically
            justifyContent: 'center', // Center items horizontally
            flexWrap: 'wrap', // Wrap items to the next line if needed
          }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: 100,
                height: 100,
                backgroundColor:
                selectedCategory?.id === item.id ? COLORS.bgRed : COLORS.secondary,
                borderRadius: 20,
                margin: 5, // Adjust margin as needed
                alignItems: 'center', // Center content within TouchableOpacity
                justifyContent: 'center', // Center content within TouchableOpacity
                  ...styles.shadow,
              }}
              onPress={() => onSelectCategory(item)}>
              {/* House Cover */}
              <Image
                source={item.icon}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                }}
              />

              {/* Book Info */}
              <View
                style={{
                  marginTop: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body44,
                   color:
                selectedCategory?.id === item.id ? COLORS.black : COLORS.white,
              ...FONTS.body44,
                  }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
        </View>
      );
    };


    return (
      <View onLayout={() => setIsListRendered(true)}>
        <Text style={{ ...FONTS.h5, paddingHorizontal: SIZES.padding1 }}>
          Categories : {title}
        </Text>

        <FlatList
          ref={flatListRef} // Attach the ref to FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderRow}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
          onLayout={() => setIsListRendered(true)} // Mark list as rendered
        />
      </View>
    );
  }

  function renderRestaurantList() {
    return (
      <FlatList
        data={restaurants}
        keyExtractor={(item) => `${item.id}`}
        renderItem={(props) => <RestaurantItem {...props} navigation={navigation} getCategoryNameById={getCategoryNameById} />}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 30,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.khak}}>
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});
