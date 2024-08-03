import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#F96D41',
  secondary: '#25282F',

  // colors
  green: '#406F54',
  khak: '#FCE6D4',
  blue: '#0043F9',
  backgroundLight: '#F0F0F3',
  backgroundMedium: '#B9B9B9',
  backgroundDark: '#1E1B26',

  black: '#1E1B26',
  bg: '#D4D5D6',
  bgRed: '#FD1849',
  white: '#FFFFFF',
  lightGray: '#64676D',
  lightGray2: '#EFEFF0',
  lightGray3: '#D4D5D6',
  lightGray4: '#7D7E84',
  gray: '#2D3038',
  gray2: '#48494d',
  gray1: '#282C35',
  darkRed: '#31262F',
  lightRed: '#C04345',
  lightgreen: '#00AC76',
  darkBlue: '#22273B',
  lightBlue: '#424BAF',
  darkGreen: '#213432',
  lightGreen: '#31Ad66',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 12,
  padding1: 16,
  padding2: 36,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 20,
  h6: 25,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 16,
  body6: 25,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'Roboto-regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h5, lineHeight: 28 },
  h6: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h6, lineHeight: 30 },
  body1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body5,
    lineHeight: 25,
  },
  body6: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body6,
    lineHeight: 25,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
