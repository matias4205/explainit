const HtmlWebpackPlugin = require('html-webpack-plugin')

const _explainitInsertStyles = (element) => {
  let parent

  const interval = setInterval(() => {
    parent = document.querySelector('#explainit__iframe')?.contentWindow?.document?.head

    if (parent) {
      var lastInsertedElement = window._lastElementInsertedByStyleLoader

      if (!lastInsertedElement) {
        parent.insertBefore(element, parent.firstChild)
      } else if (lastInsertedElement.nextSibling) {
        parent.insertBefore(element, lastInsertedElement.nextSibling)
      } else {
        parent.appendChild(element)
      }

      window._lastElementInsertedByStyleLoader = element
      clearInterval(interval)
    }
  }, 10)
}

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: 'explainit.js',
    publicPath: '/'
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
              insert: _explainitInsertStyles
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
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
          {
            loader: 'style-loader',
            options: {
              insert: _explainitInsertStyles
            }
          },
          'css-loader'
        ],
        exclude: /\.module\.css$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}
