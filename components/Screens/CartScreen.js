import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SIZES, icons, images } from '../Utls';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import cartData from './cartData.json'; // Import JSON file

const MyCart = ({ navigation }) => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    return  getDataFromDB();
  });

  // Get data from local DB by ID
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    items = JSON.parse(items) || [];

    // Use cartData from JSON file
    let productData = cartData.filter(data => items.includes(data.id));
    setProduct(productData);
    getTotal(productData);
  };

  // Get total price of all items in the cart
  const getTotal = productData => {
    let total = productData.reduce((acc, item) => acc + item.productPrice, 0);
    setTotal(total);
  };

  // Remove item from Cart
  const removeItemFromCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray) || [];
    itemArray = itemArray.filter(item => item !== id);

    await AsyncStorage.setItem('cartItems', JSON.stringify(itemArray));
    getDataFromDB();
  };

  // Checkout
  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }

    ToastAndroid.show('Items will be Delivered SOON!', ToastAndroid.SHORT);
    navigation.navigate('Home');
  };

  const renderProducts = (data, index) => (
    <TouchableOpacity
      key={data.id}
      onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}
      style={{
        width: '100%',
        height: 100,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '30%',
          height: 100,
          padding: 14,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.backgroundLight,
          borderRadius: 10,
          marginRight: 22,
        }}>
        <Image
          source={{ uri: data.productImage }} // Use uri if the image path is a URL
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'space-around',
        }}>
        <View>
          <Text
            style={{
              fontSize: 14,
              maxWidth: '100%',
              color: COLORS.black,
              fontWeight: '600',
              letterSpacing: 1,
            }}>
            {data.productName}
          </Text>
          <View
            style={{
              marginTop: 4,
              flexDirection: 'row',
              alignItems: 'center',
              opacity: 0.6,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                maxWidth: '85%',
                marginRight: 4,
              }}>
              &#8377;{data.productPrice}
            </Text>
            <Text>
              (~&#8377;{data.productPrice + data.productPrice / 20})
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: 100,
                marginRight: 20,
                padding: 4,
                borderWidth: 1,
                borderColor: COLORS.backgroundMedium,
                opacity: 0.5,
              }}>
              <MaterialCommunityIcons
                name="minus"
                style={{
                  fontSize: 16,
                  color: COLORS.backgroundDark,
                }}
              />
            </View>
            <Text>1</Text>
            <View
              style={{
                borderRadius: 100,
                marginLeft: 20,
                padding: 4,
                borderWidth: 1,
                borderColor: COLORS.backgroundMedium,
                opacity: 0.5,
              }}>
              <MaterialCommunityIcons
                name="plus"
                style={{
                  fontSize: 16,
                  color: COLORS.backgroundDark,
                }}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
            <MaterialCommunityIcons
              name="delete-outline"
              style={{
                fontSize: 16,
                color: COLORS.backgroundDark,
                backgroundColor: COLORS.backgroundLight,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.khak,
        position: 'relative',
      }}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLORS.backgroundDark,
                padding: 12,
                backgroundColor: COLORS.backgroundLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.black,
              fontWeight: '400',
            }}>
            Order Details
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.black,
            fontWeight: '500',
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}>
          My Cart
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          {product.length > 0 ? product.map(renderProducts) : null}
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 20,
              }}>
              Delivery Location
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    color: COLORS.blue,
                    backgroundColor: COLORS.backgroundLight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 12,
                    borderRadius: 10,
                    marginRight: 18,
                  }}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    style={{
                      fontSize: 18,
                      color: COLORS.blue,
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLORS.black,
                      fontWeight: '500',
                    }}>
                    2 Petre Melikishvili St.
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLORS.black,
                      fontWeight: '400',
                      opacity: 0.6,
                    }}>
                    (10 mins away)
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => checkOut()}>
                <MaterialCommunityIcons
                  name="credit-card-outline"
                  style={{
                    fontSize: 24,
                    color: COLORS.backgroundDark,
                    backgroundColor: COLORS.backgroundLight,
                    padding: 12,
                    borderRadius: 12,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
                fontWeight: '500',
              }}>
              Total
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
                fontWeight: '500',
              }}>
              &#8377;{total}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyCart;