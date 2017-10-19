const pokore = require('pokore')

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

module.exports = (options, req) => ({
  entry: './src/main.js',
  extendWebpack(config) {
    config.module
      .rule('lint')
        .test(/\.js[x]?$/)
        .pre()
        .exclude
          .add(/node_modules/)
          .end()
        .use('eslint')
          .loader('eslint-loader')
  },

  vue: {
    loaders: {
      js: 'babel-loader!eslint-loader'
    }
  },

  postcss: {
    plugins: postcssPlugins,
    options: {
      parser: pokore.sugarss
    }
  },

  // Uncomment this block to setting proxy.
  // devServer: {
  //   proxy: 'http://localhost:8080/api'
  // }
})
