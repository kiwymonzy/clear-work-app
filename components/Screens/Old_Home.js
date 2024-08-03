import React, { useState, useEffect, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONTS, SIZES, icons, images } from '../Utls';
import Config from './../Utls/Config';
import { Items } from '../Database/Database';



const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 18 }}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray,
          borderLeftWidth: 1,
        }}></View>
    </View>
  );
};

export default function HomeScreen({ navigation, name }) {
  const [username, setUsername] = useState([]);
  const [device, setDevice] = useState(null);
  const [isUi, setIsUi] = useState(null);
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);

  //get called on screen loads
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from DB

  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == 'product') {
        productList.push(Items[index]);
      } else if (Items[index].category == 'accessory') {
        accessoryList.push(Items[index]);
      }
    }

    setProducts(productList);
    setAccessory(accessoryList);
  };

  const ServiceCard = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductInfo', { productID: data.id })
        }
        style={{
          width: '48%',
          marginVertical: 14,
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: COLORS.bgRed,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          {data.isOff ? (
            <View
              style={{
                position: 'absolute',
                width: '20%',
                height: '24%',
                backgroundColor: COLORS.lightgreen,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>
                {data.offPercentage}%
              </Text>
            </View>
          ) : null}
          <Image
            source={data.productImage}
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}>
          {data.productName}
        </Text>
        {data.category == 'accessory' ? (
          data.isAvailable ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLORS.lightgreen,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.lightgreen,
                }}>
                Available
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLORS.lightRed,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.lightRed,
                }}>
                Unavailable
              </Text>
            </View>
          )
        ) : null}
        <Text>&#8377; {data.productPrice}</Text>
      </TouchableOpacity>
    );
  };
  
  const names = [];

  const profileUser = {
    name: names,
  };

  const Studio = {
    id: 1,
    title: 'Beautiful House for Rent',
    price: 2000,
    bedroom: 3,
    bathroom: 2,
    city: 'New York',
    address: '123 Main St',
    area: 2000,
    type: 'House',
    navigate: 'DetailsScreen',
    imgCover: images.apartment,
    description: 'A spacious house with stunning views.',
    genre: ['Health', 'Fitness', 'Caring'],
    backgroundColor: 'rgba(240,240,232,0.9)',
    navTintColor: '#000',
  };

  const Townhouse = {
    id: 1,
    title: 'Beautiful House for Rent',
    price: 2000,
    bedroom: 3,
    bathroom: 2,
    city: 'New York',
    address: '123 Main St',
    area: 2000,
    type: 'House',
    navigate: 'DetailsScreen',
    imgCover: images.apartment,
    description: 'A spacious house with stunning views.',
    genre: ['Health', 'Fitness', 'Caring'],
    backgroundColor: 'rgba(240,240,232,0.9)',
    navTintColor: '#000',
  };

  const Mansion = {
    id: 1,
    title: 'Beautiful House for Rent',
    price: 2000,
    bedroom: 3,
    bathroom: 2,
    city: 'New York',
    address: '123 Main St',
    area: 2000,
    type: 'House',
    navigate: 'DetailsScreen',
    imgCover: images.apartment,
    description: 'A spacious house with stunning views.',
    genre: ['Health', 'Fitness', 'Caring'],
    backgroundColor: 'rgba(240,240,232,0.9)',
    navTintColor: '#000',
  };

  const Duplex = {
    id: 1,
    title: 'Beautiful House for Rent',
    price: 2000,
    bedroom: 3,
    bathroom: 2,
    city: 'New York',
    address: '123 Main St',
    area: 2000,
    type: 'House',
    navigate: 'DetailsScreen',
    imgCover: images.apartment,
    description: 'A spacious house with stunning views.',
    genre: ['Health', 'Fitness', 'Caring'],
    backgroundColor: 'rgba(240,240,232,0.9)',
    navTintColor: '#000',
  };

  const Condominiums = {
    id: 1,
    title: 'Beautiful House for Rent',
    price: 2000,
    bedroom: 3,
    bathroom: 2,
    city: 'New York',
    address: '123 Main St',
    area: 2000,
    type: 'House',
    navigate: 'DetailsScreen',
    imgCover: images.apartment,
    description: 'A spacious house with stunning views.',
    genre: ['Health', 'Fitness', 'Caring'],
    backgroundColor: 'rgba(240,240,232,0.9)',
    navTintColor: '#000',
  };

  const Banner1 = {
    id: 6,
    imgCover: images.ads,
  };

  const Banner2 = {
    id: 7,
    imgCover: images.ads,
  };

  const myHouseData = [
    {
      ...Studio,
      HouseTypeName: 'Studio Apartment',
    },
    {
      ...Townhouse,
      HouseTypeName: 'Townhouse',
    },
    {
      ...Mansion,
      HouseTypeName: 'Mansion',
    },
    {
      ...Duplex,
      HouseTypeName: 'Duplex',
    },
    {
      ...Condominiums,
      HouseTypeName: 'Condominiumst',
    },
  ];

  const categoriesData = [
    {
      id: 1,
      categoryName: 'Ads',
      books: [Banner1, Banner2],
    },
  ];

  const [profile, setFiredUid] = React.useState(profileUser);
  const [categories, setCategories] = React.useState(categoriesData);
  const [myHouse, setMyHouse] = React.useState(myHouseData);

  const [selectedCategory, setSelectedCategory] = React.useState(1);

  function renderHeader(profile) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}>
        {/* Greetings */}
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginRight: SIZES.padding,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={icons.location}
              resizeMode="contain"
              style={{
                width: 25,
                tintColor: COLORS.black,
                height: 25,
              }}
            />
            <Text style={{ ...FONTS.h3, color: COLORS.black }}>
              {' '}
              Sinza, Dar-es-Salaam
            </Text>
          </View>
        </View>

        {/* Points */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.black,
            height: 40,
            paddingLeft: 3,
            paddingRight: 3,
            paddingTop: 3,
            paddingBottom: 3,
            borderRadius: 40,
          }}
          onPress={() => navigation.navigate('Login')}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 33,
                height: 33,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 33,
                backgroundColor: COLORS.black,
              }}>
              <Image
                source={icons.profile}
                resizeMode="contain"
                style={{
                  width: 20,
                  tintColor: COLORS.white,
                  height: 20,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderButtonSection() {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', padding: SIZES.padding }}>
        <View
          style={{
            flexDirection: 'row',
            height: 70,
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.radius,
          }}>
          {/* Claim */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => console.log('Claim')}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginLeft: SIZES.base,
                  ...FONTS.body6,
                  color: COLORS.white,
                }}>
                {Config.APP_NAME}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderMyHouseSection(myHouse) {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: index == 0 ? SIZES.padding : 0,
            marginRight: SIZES.radius,
          }}
          onPress={() =>
            navigation.navigate(item.navigate, {
              house: item,
            })
          }>
          {/* House Cover */}
          <Image
            source={item.imgCover}
            resizeMode="cover"
            style={{
              width: 180,
              height: 250,
              borderRadius: 20,
              borderColor: COLORS.black,
              borderWidth: 2,
            }}
          />

          {/* Book Info */}
          <View
            style={{
              marginTop: SIZES.radius,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              //source={icons.page_icon}
              source={images.sampleImage}
              style={{
                marginLeft: SIZES.radius,
                width: 20,
                height: 20,
                tintColor: COLORS.black,
              }}
            />
            <Text
              style={{
                marginLeft: 5,
                ...FONTS.body3,
                color: COLORS.black,
              }}>
              {item.HouseTypeName}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ ...FONTS.h2, color: COLORS.black }}>Categories</Text>

          <TouchableOpacity onPress={() => console.log('See More')}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray,
                alignSelf: 'flex-start',
                textDecorationLine: 'underline',
              }}></Text>
          </TouchableOpacity>
        </View>

        {/* Books */}
        <View style={{ flex: 1, marginTop: SIZES.padding }}>
          <FlatList
            data={myHouse}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function renderCategoryHeader() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ flex: 1, marginRight: SIZES.padding }}
          onPress={() => setSelectedCategory(item.id)}>
          {selectedCategory == item.id && (
            <Text style={{ ...FONTS.h2, color: COLORS.black }}>
              {item.categoryName}
            </Text>
          )}
          {selectedCategory != item.id && (
            <Text style={{ ...FONTS.h2, color: COLORS.black }}>
              {item.categoryName}
            </Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
        <FlatList
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          horizontal
        />
      </View>
    );
  }

  function renderCategoryData() {
    var books = [];

    let selectedCategoryBooks = categories.filter(
      (a) => a.id == selectedCategory
    );

    if (selectedCategoryBooks.length > 0) {
      books = selectedCategoryBooks[0].books;
    }

    const renderItem = ({ item }) => {
      return (
        <View style={{ marginVertical: SIZES.base }}>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row' }}
            onPress={() =>
              navigation.navigate('', {
                book: item,
              })
            }>
            {/* House Cover */}
            <Image
              source={item.imgCover}
              resizeMode="cover"
              style={{
                width: '95%',
                height: 150,
                borderRadius: 10,
                borderColor: COLORS.black,
                borderWidth: 2,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: '5%' }}>
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.khak }}>
      {/* Header Section */}
      <View style={{ height: 130 }}>
        {renderHeader(profile)}
        {renderButtonSection()}
      </View>

      {/* House Section */}
      <ScrollView style={{ marginTop: SIZES.radius }}>
        {/* House Section */}
        <View>{renderMyHouseSection(myHouse)}</View>

        {/* Categories Section */}
        <View style={{ marginTop: SIZES.padding }}>
          <View>{renderCategoryHeader()}</View>
          <View>{renderCategoryData()}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
