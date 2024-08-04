import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated
} from 'react-native';
import AuthRepository from '../Repositories/AuthRepository';
import BannerRepository from '../Repositories/BannerRepository';
import { COLORS, SIZES } from '../Utls';

const { width } = Dimensions.get('window');

const SettingScreen = () => {
  const [businessConfig, setBusinessConfig] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [banners, setBanners] = useState([]);

  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchBusinessConfig = async () => {
      try {
        const config = await AuthRepository.getBusinessConfig();
        setBusinessConfig(config);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessConfig();
  }, []);

  const handleBanner = async () => {
    setLoading(true);
    try {
      const params = {
        limit: 10,
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
    } finally {
      setLoading(false);
    }
  };

  if (loading && banners.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
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
              width: width - SIZES.padding * 2,
              height: 150,
              borderRadius: 10,
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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleBanner}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.textButton}>BANNER</Text>
        )}
      </TouchableOpacity>
      {banners.length > 0 && renderBannerData()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.khak,
    padding: 16,
  },
  button: {
    backgroundColor: COLORS.green,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    marginBottom: 16,
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingScreen;
