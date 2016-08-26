const webpack = require('webpack')
const { resolve } = require('path')
const pokore = require('pokore')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

function isProduction () {
  return process.env.NODE_ENV === 'production'
}

const webpackConfig = {
  debug: isProduction(),
  module: {},
  resolve: {}
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

webpackConfig.entry = {
  app: './client/main.js',
  vendor: [
    'vue'
  ]
}

webpackConfig.output = {
  filename: '[name].js',
  path: resolve(__dirname, 'dist')
}

webpackConfig.module.preLoaders = [
  {
    test: /\.js[x]?$/,
    loader: 'eslint',
    exclude: /node_modules/
  }
]

webpackConfig.module.loaders = [
  {
    test: /\.js[x]?$/,
    loader: 'babel',
    exclude: /node_modules/,
    // Setting babelrc to false, course ava will use it for transpile sources.
    // Disabled es2015 modules, so webpack2 can use tree shaking.
    query: {
      babelrc: false,
      presets: [
        [
          'es2015',
          {
            'modules': false
          }
        ],
        'stage-2'
      ]
    }
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

webpackConfig.resolve.alias = {
  'vue': 'vue/dist/vue.js'
}

webpackConfig.vue = {
  postcss: {
    plugins: postcssPlugins,
    options: {
      parser: pokore.sugarss
    }
  },
  loaders: {
    css: ExtractTextPlugin.extract('css'),
    sss: ExtractTextPlugin.extract('css!postcss')
  }
}

webpackConfig.plugins = [
  new ExtractTextPlugin({
    filename: "./css/[name].css",
    disable: false,
    allChunks: true
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  })
]

webpackConfig.postcss = _webpack => {
  return {
    plugins: postcssPlugins,
    parser: pokore.sugarss
  }
}

webpackConfig.eslint = {
  failOnWarning: false,
  failOnError: true
}

module.exports = webpackConfig
