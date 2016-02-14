module.exports = {
  entry: {
    app: './public/javascripts/app.js'
  },
  output: {
    filename: '[name].dist.js',
    path: './public/build/'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: 'es2015'
        },
        exclude: /node_modules/
      }
    ]
  },
  vue: {
    postcss: [
      require('postcss-import'),
      require('postcss-simple-vars'),
      require('postcss-nested')
    ]
  }
}
