import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HTMLView from 'react-native-htmlview';
import { images, icons, COLORS, FONTS, SIZES } from '../Utls';
import BackButton from '../Item/BackButton';
import Background from '../Item/Background';
import { Entypo, FontAwesome } from '@expo/vector-icons';
const preprocessHTML = (html) => {
  // Replace multiple line breaks with a single newline
  return html.replace(/(\r\n|\n|\r){2,}/g, '\n');
};
const StarReview = ({ rate }) => {
  var starComponents = [];
  var fullStar = Math.floor(rate);
  var noStar = Math.floor(5 - rate);
  var halfStar = 5 - fullStar - noStar;

  // Full Star
  for (var i = 0; i < fullStar; i++) {
    starComponents.push(
      <Image
        key={`full-${i}`}
        source={icons.starFull}
        resizeMode="cover"
        style={{
          width: 20,
          height: 20,
        }}
      />
    );
  }

  // Half Star
  for (var h = 0; h < halfStar; h++) {
    starComponents.push(
      <Image
        key={`half-${h}`}
        source={icons.starHalf}
        resizeMode="cover"
        style={{
          width: 20,
          height: 20,
        }}
      />
    );
  }

  // No Star
  for (var u = 0; u < noStar; u++) {
    starComponents.push(
      <Image
        key={`empty-${u}`}
        source={icons.starEmpty}
        resizeMode="cover"
        style={{
          width: 20,
          height: 20,
        }}
      />
    );
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {starComponents}
      <Text
        style={{ marginLeft: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}>
        {rate}.0
      </Text>
    </View>
  );
};

const IconLabel = ({ icon, label }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={icon}
        resizeMode="cover"
        style={{
          width: 50,
          height: 50,
        }}
      />
      <Text
        style={{ marginTop: SIZES.padding, color: COLORS.white, ...FONTS.h3 }}>
        {label}
      </Text>
    </View>
  );
};

const ServiceScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const [selectedTab, setSelectedTab] = useState('overview');
  const [modalVisible, setModalVisible] = useState(false);

  const handleBookService = () => {
    setModalVisible(true);
  };

  const handleRequestService = () => {
    console.log('Service ID:', data.id);
    console.log(
      'Discount Amount:',
      data.service_discount[0].discount.discount_amount
    );
    // Add your code to handle the service request here
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ flex: 2 }}>
        <Image
          source={{ uri: data.cover_image_full_path }}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '50%',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        />

        <View
          style={[
            {
              position: 'absolute',
              top: '30%',
              left: '5%',
              right: '5%',
              borderRadius: 37,
              padding: SIZES.padding,
              backgroundColor: COLORS.white,
            },
            styles.shadow,
          ]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.shadow}>
              <Image
                source={{ uri: data.thumbnail_full_path }}
                resizeMode="cover"
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 25,
                }}
              />
            </View>

            <View
              style={{
                marginHorizontal: SIZES.radius,
                justifyContent: 'space-around',
              }}>
              <Text style={{ ...FONTS.h3 }}>{data.name}</Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                Tanzania
              </Text>

              <StarReview rate={data.rating_count} />
            </View>
          </View>

          <View style={{ marginTop: SIZES.radius }}>
            <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
              {data.short_description}
            </Text>
          </View>
        </View>
      </View>

      {/* Body */}
      <View
        style={[
          {
            flex: 1.5,
            position: 'absolute',
            top: '45%',
            left: '5%',
            right: '5%',
          },
          styles.shadow,
        ]}>
        {/* Icons */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding * 2,
            justifyContent: 'space-between',
          }}>
          <IconLabel icon={icons.childsport} label="OverView" />
          <IconLabel icon={icons.childsport} label="Provider" />
          <IconLabel icon={icons.childsport} label="FAQs" />
        </View>

        {/* About */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                color: COLORS.black,
                flexDirection: 'row',
                backgroundColor: COLORS.primary,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => setSelectedTab('overview')}>
                <Text
                  style={{
                    ...FONTS.h2,
                    fontWeight: selectedTab === 'overview' ? 'bold' : 'normal',
                  }}>
                  Service Overview
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTab('provider')}>
                <Text
                  style={{
                    ...FONTS.h2,
                    fontWeight: selectedTab === 'overview' ? 'bold' : 'normal',
                  }}>
                  Provider Details
                </Text>
              </TouchableOpacity>
            </View>
                      {/* About */}
                      <View style={{ flex: 1, marginTop: SIZES.padding,paddingHorizontal: SIZES.padding, }}>
                        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>About</Text>
                        <ScrollView style={{ flex: 1, padding: 10 }}>
                        <Text
                          style={{
                            marginTop: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.body3,
                          }}>
                              <HTMLView value={preprocessHTML(data.description)} stylesheet={htmlStyles} />
                        </Text>
                         </ScrollView>
                      </View>
          </View>
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={{ flex: 0.5, paddingHorizontal: SIZES.padding }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          {data.is_active === 1 ? (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: COLORS.bgRed,
                padding: SIZES.padding1,
                borderRadius: 20,
                alignItems: 'center',
              }}
              onPress={handleBookService}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                BOOK SERVICE
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            padding: 16,
            justifyContent: 'center',
            backgroundColor: 'pink',
          }}>
          <Text style={{ fontSize: 18, marginBottom: 16 }}>Book Service</Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Service ID: {data.id}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Discount Amount: {data.service_discount[0].discount.discount_amount}
            %
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Choose Address for Service:
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Choose Time: ASAP
          </Text>
          <Button
            title="Request Service"
            onPress={handleRequestService}
            style={{ padding: 10 }}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: COLORS.black,
  },
  shadow: {
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const htmlStyles = StyleSheet.create({
  h3: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
    color:"white",
  },
  p: {
    fontSize: 12,
    margin: 0,
    padding: 0,
    lineHeight: 14,
        color:"white",
  },
  ul: {
    margin: 0,
    padding: 0,
        color:"white",
  },
  li: {
    fontSize: 12,
    margin: 0,
    padding: 0,
    lineHeight: 14,
        color:"white",
  },
});

export default ServiceScreen;
