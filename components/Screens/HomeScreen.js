import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Items } from '../Database/Database';
import { COLORS, FONTS, SIZES, icons, images } from '../Utls';
import Config from './../Utls/Config';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const HomeScreen = ({ navigation }) => {
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

  //create an product reusable card

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 90,
        backgroundColor: COLORS.khak,
      }}>
      <View>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            }}>
            <TouchableOpacity>
              <Entypo
                name="shopping-bag"
                style={{
                  fontSize: 18,
                  color: COLORS.secondary,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: COLORS.backgroundLight,
                }}
              />
            </TouchableOpacity>
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
          onPress={() => navigation.navigate('OldHome')}>
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
              <MaterialCommunityIcons
                name="cart"
                style={{
                  fontSize: 20,
                  color: COLORS.bgRed,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
          </View>
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
                  Products
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
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.blue,
                  fontWeight: '400',
                }}>
                SeeAll
              </Text>
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
                  Accessories
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
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.blue,
                  fontWeight: '400',
                }}>
                SeeAll
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}>
              {accessory.map((data) => {
                return <ServiceCard data={data} key={data.id} />;
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
