module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: { '@': './src' },
          extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        },
      ],
      // react-native-worklets/plugin must run last (Reanimated 4 uses the
      // separate react-native-worklets package for its babel/worklet transform).
      'react-native-worklets/plugin',
    ],
  };
};
