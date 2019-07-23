const fs = require('fs')
const path = require('path')
// koa
const Koa = require('koa')
const Router = require('koa-router')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')
// other modules
const XlsxTemplate = require('xlsx-template')
// object
const app = new Koa()
const router = require('./routes')

app.use(router.routes())
app.use(koaStatic(path.join(__dirname, 'public')))

module.exports = app
