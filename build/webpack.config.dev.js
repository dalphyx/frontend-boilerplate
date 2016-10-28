const webpack = require('webpack')
const path = require('path')
const pokore = require('pokore')
const webpackMd5Hash = require('webpack-md5-hash')

const postcssPlugins = [
  pokore.import,
  pokore.colorAlpha,
  pokore.extend,
  pokore.size,
  pokore.reset,
  pokore.propertylookup,
  pokore.autoprefixer,
  pokore.nested,
  pokore.sorting({ 'sort-order': pokore.cssortie })
]

const webpackConfig = {
  entry: {
    app: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      './client/main.js'
    ],
    vendor: [
      'vue'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./', 'dist'),
    publicPath: 'http://localhost:3000/static/'
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        enforce: 'pre',
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.js[x]?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue',
        options: {
          postcss: {
            plugins: postcssPlugins,
            options: {
              parser: pokore.sugarss
            }
          },
          loaders: {
            js: 'babel!eslint'
          }
        }
      },
      {
        test: /\.sss$/,
        loader: ['style', 'css', 'postcss']
      }
    ]
  },

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },

  resolveLoader: {
    modules: [path.resolve('.', 'node_modules')]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          failOnWarning: false,
          failOnError: true
        },
        postcss: (_webpack) => {
          return {
            plugins: postcssPlugins,
            parser: pokore.sugarss
          }
        }
      }
    })
  ]
}

module.exports = webpackConfig
