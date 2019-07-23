const fs = require('fs')
const path = require('path')
// koa
const Koa = require('koa')
const koaStatic = require('koa-static')
// object
const app = new Koa()
const router = require('./routes')

app.use(router.routes())
app.use(koaStatic(path.join(__dirname, 'public')))

module.exports = app
