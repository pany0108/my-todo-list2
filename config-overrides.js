const path = require('path');
const {
  // config 설정 후 사용자 정의 webpack 설정
  addDecoratorsLegacy, // decorator를 사용할 수 있도록 해주는 config
  addWebpackAlias,
  addBabelPlugins,
  removeModuleScopePlugin,
  override,
} = require('customize-cra');

// 사용자 정의 webpack 설정
module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
    addBabelPlugins('@babel/plugin-proposal-class-properties'),
    removeModuleScopePlugin(),
    addWebpackAlias({
      '~': path.resolve(__dirname, './src'),
    }),
  ),
};
