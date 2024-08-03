import React, { useState, useRef, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  StatusBar,
  Animated,
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
    <View style={{ width: 1, paddingVertical: 30 }}>
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
  {
    /* PROFILE */
  }
  const [username, setUsername] = useState([]);
  const [device, setDevice] = useState(null);
  const [isUi, setIsUi] = useState(null);
  {
    /* END PROFILE */
  }

  {
    /* BANNER */
  }
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    let selectedCategoryBooks = categories.filter(
      (a) => a.id === selectedCategory
    );
    if (selectedCategoryBooks.length > 0) {
      setBooks(selectedCategoryBooks[0].books);
    }
  }, [selectedCategory, categories]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex =
          prevIndex === books.slice(0, 5).length - 1 ? 0 : prevIndex + 1;
        flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
        return newIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [books]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;
  {
    /* END BANNER */
  }

  {
    /* CATEGORY */
  }
  const [products, setProducts] = useState([]);
  const [trending, setTrending] = useState([]);

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
    let trendingList = [];
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == 'product') {
        productList.push(Items[index]);
      } else if (Items[index].category == 'trending') {
        trendingList.push(Items[index]);
      }
    }

    setProducts(productList);
    setTrending(trendingList);
  };

  {
    /* END CATEGORY */
  }

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
        {data.category == 'product' ? (
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
        <Text>TZS  {data.productPrice}</Text>
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

  const myCategoryData = [
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
  const [myCategory, setMyCategory] = React.useState(myCategoryData);
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

  function renderCategorySection(myCategory) {
    // Function to group items into rows of three
    const groupItems = (data, numColumns) => {
      const groupedData = [];
      for (let i = 0; i < data.length; i += numColumns) {
        groupedData.push(data.slice(i, i + numColumns));
      }
      return groupedData;
    };

    const groupedCategories = groupItems(myCategory, 3);

    const renderRow = ({ item }) => {
      return (
        <View style={{ flexDirection: 'row', marginBottom: SIZES.radius }}>
          {item.map((category, catIndex) => (
            <TouchableOpacity
              key={category.id}
              style={{
                flex: 1,
                marginLeft: catIndex === 0 ? SIZES.padding : SIZES.radius,
                marginRight: catIndex === 2 ? SIZES.padding : SIZES.radius,
              }}
              onPress={() =>
                navigation.navigate(category.navigate, {
                  category: category,
                })
              }>
              {/* House Cover */}
              <Image
                source={category.imgCover}
                resizeMode="cover"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 20,
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.25,
                  shadowRadius: 10,
                  elevation: 5,
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
                    ...FONTS.body4,
                    color: COLORS.black,
                  }}>
                  {category.HouseTypeName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    };

    return (
      <View style={{ flex: 1, paddingHorizontal: SIZES.padding1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.black,
                fontWeight: '500',
                letterSpacing: 1,
              }}>
              All Categories
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.black,
                fontWeight: '400',
                opacity: 0.5,
                marginLeft: 10,
              }}>
              41
            </Text>
          </View>
          <TouchableOpacity onPress={() => console.log('See More')}>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.blue,
                fontWeight: '500',
              }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Books */}
        <View style={{ flex: 1, marginTop: SIZES.padding }}>
          <FlatList
            data={groupedCategories}
            renderItem={renderRow}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  // Get screen dimensions
  const { width } = Dimensions.get('window');

  function renderProductData() {
    return (
      <View>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginBottom: 10,
              padding: 16,
            }}>
            <Text
              style={{
                fontSize: 26,
                color: COLORS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 10,
              }}>
              Hi-Fi Shop &amp; Service
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.black,
                fontWeight: '400',
                letterSpacing: 1,
                lineHeight: 24,
              }}>
              Audio shop on Rustaveli Ave 57.
              {'\n'}This shop offers both products and services
            </Text>
          </View>

          <View>{renderCategorySection(myCategory)}</View>

          <View
            style={{
              padding: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: COLORS.black,
                    fontWeight: '500',
                    letterSpacing: 1,
                  }}>
                  Popular Services
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.black,
                    fontWeight: '400',
                    opacity: 0.5,
                    marginLeft: 10,
                  }}>
                  41
                </Text>
              </View>
              <TouchableOpacity onPress={() => console.log('See More')}>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.blue,
                    fontWeight: '500',
                  }}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}>
              {trending.map((data) => {
                return <ServiceCard data={data} key={data.id} />;
              })}
            </View>
          </View>

          <View
            style={{
              padding: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: COLORS.black,
                    fontWeight: '500',
                    letterSpacing: 1,
                  }}>
                  Services
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.black,
                    fontWeight: '400',
                    opacity: 0.5,
                    marginLeft: 10,
                  }}>
                  78
                </Text>
              </View>
              <TouchableOpacity onPress={() => console.log('See More')}>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.blue,
                    fontWeight: '500',
                  }}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}>
              {products.map((data) => {
                return <ServiceCard data={data} key={data.id} />;
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  function renderBannerData() {
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* House Cover */}
          <Image
            source={item.imgCover}
            resizeMode="cover"
            style={{
              width: width - SIZES.padding * 2, // Ensure image takes up full width minus padding
              height: 150,
              borderRadius: 10,
              //borderColor: COLORS.black,
              //borderWidth: 2,
            }}
          />
        </View>
      );
    };

    return (
      <View style={{ flex: 1, marginTop: SIZES.radius }}>
        <FlatList
          ref={flatListRef}
          data={books.slice(0, 5)} // Limit the number of items to 5
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: SIZES.padding,
          }}>
          {books.slice(0, 5).map((_, i) => {
            // Limit the number of dots to 5
            let opacity = scrollX.interpolate({
              inputRange: [
                (i - 1) * (width - SIZES.padding * 2),
                i * (width - SIZES.padding * 2),
                (i + 1) * (width - SIZES.padding * 2),
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={`indicator-${i}`}
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: COLORS.bgRed,
                  margin: 8,
                  opacity,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.khak }}>
      {/* Header Section */}
      <View style={{ height: 40, paddingTop: SIZES.padding }}>
        {renderHeader(profile)}
      </View>

      {/* House Section */}
      <ScrollView style={{ marginTop: SIZES.radius, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

        {/* Banner Section */}
        <View style={{ marginTop: SIZES.padding }}>
          <View>{renderBannerData()}</View>
        </View>

        {/* Product Section */}
        <View>{renderProductData()}</View>
        <LineDivider />
      </ScrollView>
    </SafeAreaView>
  );
}
