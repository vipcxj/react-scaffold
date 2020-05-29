module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: (config) => {
    config.resolve.extensions.push(
        '.web.js',
        '.web.jsx',
        '.web.ts',
        '.web.tsx',
        '.ts',
        '.tsx',
    );
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    });
    return config;
  }
};
