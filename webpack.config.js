const webpack = require('webpack')
const path = require('path')
const pokore = require('pokore')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

function isProduction () {
  return process.env.NODE_ENV === 'production'
}

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
    app: './client/main.js',
    vendor: [
      'vue'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
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
        loader: 'vue'
      },
      {
        test: /\.sss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css!postcss',
          publicPath: "../"
        })
      }
    ]
  },

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },

  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: "./css/[name].css",
      disable: false,
      allChunks: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          failOnWarning: false,
          failOnError: true
        },
        vue: {
          postcss: {
            plugins: postcssPlugins,
            options: {
              parser: pokore.sugarss
            }
          },
          loaders: {
            js: 'babel!eslint',
            css: ExtractTextPlugin.extract('css'),
            sss: ExtractTextPlugin.extract('css!postcss')
          }
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
