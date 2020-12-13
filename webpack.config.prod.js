const path = require('path')

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    app: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'explainit.js',
    library: 'ExplainIt',
    libraryTarget: 'umd',
    /* Makes the default export of the entry point the root content of the library */
    libraryExport: 'default'
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
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: 'explainit--[hash:base64:6]'
              }
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'styleTag'
            }
          },
          'css-loader'
        ],
        exclude: /\.module\.css$/
      }
    ]
  }
}
