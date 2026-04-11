const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Tambahkan .svg ke assetExts dan hapus dari sourceExts agar Metro 
// memperlakukannya sebagai file gambar (untuk expo-image) bukan komponen React.
if (!config.resolver.assetExts.includes('svg')) {
  config.resolver.assetExts.push('svg');
}
config.resolver.sourceExts = config.resolver.sourceExts.filter(ext => ext !== 'svg');

module.exports = config;
