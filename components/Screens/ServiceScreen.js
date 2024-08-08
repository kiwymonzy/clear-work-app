import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FONTS, COLORS, SIZES, icons } from '../Utls';
import HTML from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';

const LineDivider = () => (
  <View style={{ width: 1, paddingVertical: 5 }}>
    <View
      style={{
        flex: 1,
        borderLeftColor: COLORS.lightGray2,
        borderLeftWidth: 1,
      }}
    />
  </View>
);

const StarReview = ({ rate }) => {
  const starComponents = [];
  const fullStar = Math.floor(rate);
  const noStar = Math.floor(5 - rate);
  const halfStar = 5 - fullStar - noStar;

  // Full Star
  for (let i = 0; i < fullStar; i++) {
    starComponents.push(
      <Image
        key={`full-${i}`}
        source={icons.starFull}
        resizeMode="cover"
        style={{ width: 20, height: 20 }}
      />
    );
  }

  // Half Star
  for (let h = 0; h < halfStar; h++) {
    starComponents.push(
      <Image
        key={`half-${h}`}
        source={icons.starHalf}
        resizeMode="cover"
        style={{ width: 20, height: 20 }}
      />
    );
  }

  // No Star
  for (let u = 0; u < noStar; u++) {
    starComponents.push(
      <Image
        key={`empty-${u}`}
        source={icons.starEmpty}
        resizeMode="cover"
        style={{ width: 20, height: 20 }}
      />
    );
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {starComponents}
      <Text style={{ marginLeft: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}>
        {rate.toFixed(1)}
      </Text>
    </View>
  );
};

const ServiceScreen = ({ route, navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [book, setBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const IconLabel = ({ label }) => (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={() => setSelectedTab(label)}>
        <Text
          style={[
            { marginTop: SIZES.padding, fontSize: 30, fontWeight: 'bold' },
            { color: selectedTab === label ? COLORS.bgRed : COLORS.white },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const handleBookService = () => {
    setModalVisible(true);
  };

  const handleRequestService = () => {
    console.log('Service ID:', book.id);
    console.log('Discount Amount:', book.service_discount[0].discount.discount_amount);
    setModalVisible(false);
  };

  useEffect(() => {
    const { data } = route.params;
    setBook(data);
  }, [route]);

  function renderBookInfoSection() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: book.cover_image_full_path }}
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            height: 80,
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: SIZES.base }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.back_arrow_icon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>

          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.black }}></Text>
          </View>

          <TouchableOpacity
            style={{ marginRight: SIZES.base }}
            onPress={() => console.log('Click More')}
          >
            <Image
              source={icons.more_icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.white,
                alignSelf: 'flex-end',
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            {
              position: 'absolute',
              bottom: '5%',
              left: '5%',
              right: '5%',
              borderRadius: 15,
              padding: SIZES.padding,
              backgroundColor: COLORS.white,
            },
            styles.shadow,
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.shadow}>
              <Image
                source={{ uri: book.thumbnail_full_path }}
                resizeMode="cover"
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 15,
                }}
              />
            </View>

            <View
              style={{
                marginHorizontal: SIZES.radius,
                justifyContent: 'space-around',
              }}
            >
              <Text style={{ ...FONTS.h3 }}>{book.name}</Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                Tanzania
              </Text>

              <StarReview rate={book.rating_count} />
            </View>
          </View>

          <View style={{ marginTop: SIZES.radius }}>
            <Text style={{ color: COLORS.gray }}>{book.short_description}</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderBookDescription() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            margin: 0,
            paddingHorizontal: SIZES.padding * 4,
            justifyContent: 'space-between',
            backgroundColor: COLORS.black,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <IconLabel label="Overview" />
          <IconLabel label="Provider" />
        </View>

        <ScrollView style={{ flex: 1, paddingTop: 30, paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
          {selectedTab === 'Overview' ? (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <HTMLView
          value={'<h1>Hello World</h1><p>This is a paragraph.</p>'}
          stylesheet={{
            p: { color: 'red' }, // Example styling
          }}
        />
      </ScrollView>
    </View>
          ) : (
            <Text>PROVIDER</Text>
          )}
          <LineDivider />
        </ScrollView>
      </View>
    );
  }

  function renderBottomButton() {
    const getDiscountedPrice = (price, discount) => {
      if (discount.discount_amount_type === 'amount') {
        return price - discount.discount_amount;
      } else if (discount.discount_amount_type === 'percent') {
        return price - (price * discount.discount_amount) / 100;
      }
      return price;
    };

    const discountedPrice =
      book.service_discount.length > 0
        ? getDiscountedPrice(
            book.min_bidding_price,
            book.service_discount[0].discount
          )
        : book.min_bidding_price;
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            width: 100,
            backgroundColor: COLORS.secondary,
            marginLeft: SIZES.padding,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {book.service_discount.length > 0 &&
          book.service_discount[0].discount.is_active === 1 ? (
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>
              TZS {discountedPrice.toFixed(2)}
            </Text>
          ) : (
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>
              TZS {book.min_bidding_price}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            marginHorizontal: SIZES.base,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleBookService}
        >
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>BOOK SERVICE</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide">
          <View
            style={{
              flex: 1,
              padding: 16,
              justifyContent: 'center',
              backgroundColor: 'pink',
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 16 }}>Book Service</Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              Service ID: {book.id}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              Discount Amount:{' '}
              {book.service_discount[0].discount.discount_amount}%
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              Choose Address for Service:
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              Choose Time: ASAP
            </Text>
            <Button title="Request Service" onPress={handleRequestService} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </View>
    );
  }

  if (book) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.khak }}>
        <View style={{ flex: 4 }}>{renderBookInfoSection()}</View>
        <View style={{ flex: 4 }}>{renderBookDescription()}</View>
        <View style={{ height: 70, marginBottom: 30 }}>{renderBottomButton()}</View>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default ServiceScreen;
