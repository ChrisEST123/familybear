// Import Expo's default Metro bundler configuration generator
const { getDefaultConfig } = require('expo/metro-config');

// Generate the default config for the current project directory
const config = getDefaultConfig(__dirname);

// Export the Metro configuration to be used by Expo CLI
module.exports = config;
