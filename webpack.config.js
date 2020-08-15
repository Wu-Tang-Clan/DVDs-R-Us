const path = require('path');

module.exports = {
  mode: 'development',
  // watch: true,
  devtool: 'source-map',
  entry: path.join(__dirname, './client/index.jsx'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
        },
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
