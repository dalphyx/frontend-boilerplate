require('babel-polyfill')
require('babel-register')
const Koa = require('koa')
const webpack = require('webpack')
const config = require('./webpack.config.dev.js')
const startApp = require('./startApp')
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
const compiler = webpack(config)
const app = new Koa()

app.env = 'development'

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(hotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}))

startApp(app)
