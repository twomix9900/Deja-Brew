const path = require('path');

module.exports = {
  entry: path.join(__dirname, './index.js'),
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: [ 'es2015', 'react' ] }
      }
    ]
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
};
