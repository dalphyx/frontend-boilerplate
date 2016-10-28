const webpack = require('webpack')
const path = require('path')
const pokore = require('pokore')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const assetsWebpackPlugin = require('assets-webpack-plugin')
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
      './client/main.js'
    ],
    vendor: [
      'vue'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./', 'dist'),
    publicPath: '/static/'
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
            js: 'babel!eslint',
            css: ExtractTextPlugin.extract('css'),
            sss: ExtractTextPlugin.extract('css!postcss')
          }
        }
      },
      {
        test: /\.sss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css!postcss',
          path: path.resolve('.', 'dist'),
          publicPath: "/static/"
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
    modules: [path.resolve('.', 'node_modules')]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: "/css/[name].css",
      disable: false,
      allChunks: true
    }),

    new webpackMd5Hash(),

    new assetsWebpackPlugin({
      prettyPrint: true
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
