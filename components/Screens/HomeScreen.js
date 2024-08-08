import React, { useState, useRef, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
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
import BannerRepository from '../Repositories/BannerRepository';
import CategoryRepository from '../Repositories/CategoryRepository';
import { useBusinessConfig } from '../../context/BusinessConfigContext';

const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 35 }}>
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
  const [error, setError] = useState(null);
  const [banners, setBanners] = useState([]);

  const [profile, setFiredUid] = React.useState(profileUser);

  const [categoryDetails, setMyCategory] = useState([]);
  const [trendingDetails, setTrendingData] = useState([]);
  const [servicesDetails, setServiceData] = useState([]);

  const { categories, services, trending } = useBusinessConfig();

  const [totalCategory, setTotalCategory] = React.useState(0);
  const [totalService, setTotalServices] = React.useState(0);
  const [totalTrending, setTotalTrending] = React.useState(0);

  useEffect(() => {
    const handleBanner = async () => {
      try {
        const params = {
          limit: 100,
          offset: 1,
        };
        const response = await BannerRepository.index(params);
        if (response.response_code === 'default_200') {
          setBanners(response.content.data);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const handleCategoryList = async () => {
      try {
        if (categories.response_code === 'default_200') {
          setTotalCategory(categories.content.total);
          //console.log("______________________")
          //console.log(categories.content.data);
          setMyCategory(categories.content.data);
        } else {
          setError(categories.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const handleServiceList = async () => {
      try {
        if (services.response_code === 'default_200') {
          setTotalServices(services.content.total);
          setServiceData(services.content.data);
        } else {
          setError(services.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const handleTrendingList = async () => {
      try {
        if (trending.response_code === 'default_200') {
          setTotalTrending(trending.content.total);
          setTrendingData(trending.content.data);
        } else {
          setError(trending.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    handleTrendingList();
    handleServiceList();
    handleCategoryList();
    handleBanner();
  }, [categories, services, trending]); // Empty dependency array ensures this runs once

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex =
          prevIndex === banners.slice(0, 5).length - 1 ? 0 : prevIndex + 1;
        flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
        return newIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

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

    //setProducts(productList);
    //setTrending(trendingList);
  };

  {
    /* END CATEGORY */
  }

  const ServiceCard = ({ data }) => {
    const getDiscountedPrice = (price, discount) => {
      if (discount.discount_amount_type === 'amount') {
        return price - discount.discount_amount;
      } else if (discount.discount_amount_type === 'percent') {
        return price - (price * discount.discount_amount) / 100;
      }
      return price;
    };

    const getDiscountPercentage = (price, discount) => {
      if (discount.discount_amount_type === 'amount') {
        return ((discount.discount_amount / price) * 100).toFixed(0);
      }
      return discount.discount_amount;
    };

    const discountedPrice =
      data.service_discount.length > 0
        ? getDiscountedPrice(
            data.min_bidding_price,
            data.service_discount[0].discount
          )
        : data.min_bidding_price;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('ServiceScreen', { data })}
        style={{
          width: '48%',
          marginVertical: 14,
          borderRadius: 25,
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 25,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          <Image
            source={{ uri: data.thumbnail_full_path }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              borderRadius: 25,
            }}
          />
          {data.service_discount.length > 0 &&
          data.service_discount[0].discount.is_active === 1 ? (
            <View
              style={{
                position: 'absolute',
                width: '20%',
                height: '24%',
                backgroundColor: COLORS.bgRed,
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
                {getDiscountPercentage(
                  data.min_bidding_price,
                  data.service_discount[0].discount
                )}
                %
              </Text>
            </View>
          ) : null}
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}>
          {data.name}
        </Text>
        {data.rating_count === '0' ? (
          data.is_active === '1' ? (
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
        {data.service_discount.length > 0 &&
        data.service_discount[0].discount.is_active === 1 ? (
          <View>
            <Text
              style={{
                textDecorationLine: 'line-through',
                color: COLORS.lightRed,
              }}>
              TZS {data.min_bidding_price}
            </Text>
            <Text style={{ color: COLORS.black }}>TZS {discountedPrice}</Text>
          </View>
        ) : (
          <Text style={{ color: COLORS.black }}>TZS {discountedPrice}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const names = [];

  const profileUser = {
    name: names,
  };

  function renderHeader(profile) {
    return (
     <View style={{ flexDirection: 'row', height: 50 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.bgRed,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{ ...FONTS.h3, color: COLORS.black }}>
              Sinza, Dar-es-Salaam
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}onPress={() => navigation.navigate('Login')}>
          <Image
            source={icons.user}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
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
        <View
          style={{
            flexDirection: 'row',
            marginBottom: SIZES.radius,
            alignItems: 'center', // Center items vertically
            justifyContent: 'center', // Center items horizontally
            flexWrap: 'wrap', // Wrap items to the next line if needed
          }}>
          {item.map((category, catIndex) => (
            <TouchableOpacity
              activeOpacity={1}
              key={category.id}
              style={{
                width: 100,
                height: 100,
                backgroundColor: COLORS.secondary,
                borderRadius: 20,
                margin: 5, // Adjust margin as needed
                alignItems: 'center', // Center content within TouchableOpacity
                justifyContent: 'center', // Center content within TouchableOpacity
                  ...styles.shadow,
              }}
              onPress={() => navigation.navigate('CategoryScreen', {categoryId: category.id,title: category.name})}>
              {/* House Cover */}
              <Image
                source={{ uri: category.image_full_path }}
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
                    color: COLORS.white,
                  }}>
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.padding1,
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
              {totalCategory}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen', {title: "All"})}>
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
              Expert Help &amp; Services
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.black,
                fontWeight: '400',
                letterSpacing: 1,
                lineHeight: 24,
              }}>
              Seamless Access to Professional Services.
              {'\n'}Get quality service from vetted professionals in your area.
            </Text>
          </View>

          <View>{renderCategorySection(categoryDetails)}</View>

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
                  {totalTrending}
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
              {trendingDetails.map((data) => {
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
                  {totalService}
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
              {servicesDetails.map((data) => {
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
          <Image
            source={{ uri: item.banner_image_full_path }}
            resizeMode="cover"
            style={{
              width: Platform.OS === 'web' ? 580 : width - SIZES.padding * 2,
              height: Platform.OS === 'web' ? 300 : 150, // For web, height can be auto or a specific value
              minHeight: 150, // Ensure a minimum height for web
              aspectRatio: Platform.OS === 'web' ? 16 / 9 : undefined, // Adjust aspect ratio for web
              borderRadius: 20,
            }}
          />
        </View>
      );
    };

    return (
      <View style={{ flex: 1, marginTop: SIZES.radius }}>
        <FlatList
          ref={flatListRef}
          data={banners}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: SIZES.padding,
          }}>
          {banners.slice(0, 5).map((_, i) => {
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
      <View style={{paddingTop: SIZES.padding }}>
        {renderHeader(profile)}
      </View>

      {/* House Section */}
      <ScrollView
        style={{ marginTop: SIZES.radius, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
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
