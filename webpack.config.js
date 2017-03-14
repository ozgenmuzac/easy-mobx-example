var path = require('path')
var webpack = require('webpack')
module.exports = {
  entry: [
    './components/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'components')
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, 
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.COSMIC_BUCKET': JSON.stringify(process.env.COSMIC_BUCKET)
    })
  ]
}
