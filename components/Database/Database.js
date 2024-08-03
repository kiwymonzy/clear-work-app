import { COLORS, FONTS, SIZES, icons, images } from '../Utls';

export const Items = [
  {
    id: 1,
    category: 'trending',
    productName: 'House cleaning',
    productPrice: 1799,
    description:
      'Up to 20 hours battery life | Super powerful Bass | 40mm dynamic driver | Pressure less ear muffs | Bluetooth 5.0 | Voice control',
    isOff: true,
    offPercentage: 10,
    productImage: images.sampleImage,
    isAvailable: true,
    productImageList: [
      images.apartment,images.apartment,images.apartment,
    ],
  },
  {
    id: 2,
    category: 'trending',
    productName: 'AC gas refill',
    productPrice: 1499,
    description:
      'boAt Rockerz 450 M is an on-ear wireless headset that has been ergonomically designed to meet the needs of music lovers.',
    isOff: false,
    productImage:images.sampleImage,
    isAvailable: true,
    productImageList: [
images.apartment,images.apartment,images.apartment,
    ],
  },
  {
    id: 3,
    category: 'product',
    productName: 'Hair saloon',
    productPrice: 1999,
    description:
      'Bluetooth: It has Bluetooth v5.0 with a range of 10m and is compatible with Android & iOS',
    isOff: true,
    offPercentage: 18,
    productImage: images.sampleImage,
    isAvailable: true,
    productImageList: [
images.apartment,images.apartment,images.apartment,
    ],
  },
  {
    id: 4,
    category: 'product',
    productName: 'Power supply',
    productPrice: 399,
    description:
      'Fly into your workouts with precise tones that inspire and energize your system with its HD sound, all the time.',
    isOff: false,
    productImage: images.sampleImage,
    isAvailable: true,
    productImageList: [
images.apartment,images.apartment,images.apartment,
    ],
  },
  {
    id: 5,
    category: 'product',
    productName: 'Tank and pipe cleaning',
    productPrice: 1499,
    description:
      'The unbeatable boAt signature sound shines through no matter what are you playing courtesy its 10mm drivers.',
    isOff: false,
    productImage: images.sampleImage,
    isAvailable: false,
    productImageList: [
images.apartment,images.apartment,images.apartment,
    ],
  },
  {
    id: 6,
    category: 'product',
    productName: 'Wall construction',
    productPrice: 1299,
    description:
      'One Touch Control & Voice Assistant: With one multifunction button, you can play/pause, previous/next track and answer/hang-up calls.Voice assistant function lets you access siri/Google Assistant',
    isOff: false,
    productImage: images.sampleImage,
    isAvailable: true,
    productImageList: [
images.apartment,images.apartment,images.apartment,
    ],
  },
];
