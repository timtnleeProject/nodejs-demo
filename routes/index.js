const Router = require('koa-router')
const fs = require('fs')
const path =require('path')
const koaBody = require('koa-body')
const XlsxTemplate = require('xlsx-template')

const router = new Router()

router.get('/', ctx => {
  const raw = fs.readFileSync(path.join(__dirname, '../public/demo.html'), 'utf-8')
  ctx.body = raw
})

router.post('/export/excel',
  koaBody(),
  ctx => {
    const data = ctx.request.body.data || '[]'

    const templatePath = path.join(__dirname, '../template', 'template.xlsx')
    const template = new XlsxTemplate(fs.readFileSync(templatePath))

    template.substitute(1, {
      data
    })
    const raw = template.generate({
      type: 'nodebuffer'
    })
    ctx.set('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ctx.body = raw
  }
)

module.exports = router
