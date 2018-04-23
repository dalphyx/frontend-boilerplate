module.exports = {
  entry: './src/main.js',

  plugins: [
    require('@poi/plugin-eslint')({
      command: '*',
      loaderOptions: {
        fix: true
      }
    })
  ],

  devServer: {
    proxy: {
      '/api': 'http://localhost:8080/api'
    }
  }
}