module.exports = {
  mode: 'production',
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'app.bundle.js',
    publicPath: 'dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ],
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]'
              }
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ],
        exclude: /\.module\.css$/
      }
    ]
  }
}
