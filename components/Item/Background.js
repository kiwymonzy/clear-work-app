import React from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from '../Utls';

export default function Background({ children }) {
  return (
    <ImageBackground
      source={icons.background}
      resizeMode="cover"
      style={styles.background}
      blurRadius={10}
    >
      <KeyboardAvoidingView style={styles.container} enabled>
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.black ,
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
