const { preset, sugarss } = require('pokore')

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
    plugins: preset,
    options: {
      parser: sugarss
    }
  },

  // Uncomment this block to setting proxy.
  // devServer: {
  //   proxy: 'http://localhost:8080/api'
  // }
})
