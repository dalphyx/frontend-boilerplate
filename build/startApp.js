import serve from 'koa-static'
import route from 'koa-router'
import views from 'koa-views'
import path from 'path'

const router = route()

module.exports = (app) => {

  // static serve
  app.use(serve(path.resolve('.', './dist')))

  // template
  app.use(views(path.resolve('.'), {
    map: { html: 'ejs' }
  }))

  // logger
  if (app.env === 'development') {
    app.use(async (ctx, next) => {
      const start = new Date()
      await next()
      const ms = new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  }

  router.get('/', async (ctx, next) => {
    return ctx.render('./index.html')
  })

  app.use(router.routes())

  app.listen(3000)

}
