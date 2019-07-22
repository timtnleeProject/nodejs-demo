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
const router = new Router()

router.get('/', ctx => {
  const raw = fs.readFileSync('./index.html', 'utf-8')
  ctx.body = raw
})

router.get('/export/excel',
  ctx => {
    const data = ctx.query.data || '[]'

    const templatePath = path.join(__dirname, 'template.xlsx')
    const template = new XlsxTemplate(fs.readFileSync(templatePath))

    template.substitute(1, {
      data: JSON.parse(data)
    })
    const raw = template.generate({
      type: 'nodebuffer'
    })
    const filename = 'output.xlsx'
    ctx.set('Content-disposition', `attachment; filename=${filename}`)
    ctx.set('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ctx.body = raw
  }
)

router.post('/export/excel',
  koaBody(),
  ctx => {
    const data = ctx.request.body.data || '[]'

    const templatePath = path.join(__dirname, 'template', 'template.xlsx')
    const template = new XlsxTemplate(fs.readFileSync(templatePath))

    template.substitute(1, {
      data
    })
    const raw = template.generate({
      type: 'nodebuffer'
    })
    const filename = 'output.xlsx'
    ctx.set('Content-disposition', `attachment; filename=${filename}`)
    ctx.set('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ctx.body = raw
  }
)

app.use(router.routes())
app.use(koaStatic(path.join(__dirname, 'public')))

module.exports = app
