module.exports = {
  assets: ['./assets/fonts'],
  dependencies: {
    'react-native-splash-screen': {
      platforms: {
        ios: null, // disable ios platform, other platforms will still autolink if provided
      },
    },
    'react-native-vector-icons': {
      platforms: {
        ios: null, // disable ios platform, other platforms will still autolink if provided
      },
    },
  },
};
