import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack, { Configuration } from 'webpack';

let env = process.env.NODE_ENV;
if (env !== 'development' && env !== 'production') {
  env = 'production';
}
const dev = env === 'development';

const config: Configuration = {
  mode: dev ? 'development' : 'production',
  context: path.resolve(__dirname),
  entry: './src/index.tsx',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  devServer: {
    hot: true,
    open: true,
  },
  resolve: {
    extensions: [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      '.js',
      '.json',
      '.jsx',
      '.ts',
      '.tsx',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            exclude: /node_modules/,
            use: [
              ...(dev ? ['css-modules-typescript-loader'] : []),
              dev ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: { modules: true },
              },
            ],
          },
          {
            use: [
              ...(dev ? ['css-modules-typescript-loader'] : []),
              dev ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
            ],
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: ['file-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    ...(dev ? [] : [new MiniCssExtractPlugin()]),
    new webpack.ProgressPlugin({
      profile: true,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /\.css\.d\.ts$/,
    }),
    new webpack.WatchIgnorePlugin([/\.css\.d\.ts$/]),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      templateParameters: {
        react: dev ? 'react.development' : 'react.production.min',
        reactDom: dev ? 'react-dom.development' : 'react-dom.production.min',
      },
    }),
  ],
};

export default config;
