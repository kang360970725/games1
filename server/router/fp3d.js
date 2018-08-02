const router = require('koa-router')()
const utils = require('../utils')

router.get('/fp3d/timestamp', (ctx, next) => {
  ctx.response.type = 'json'
  ctx.response.body = {
    code: 0,
    data: utils.getFp3dFinTimestamp()
  }
  return
})

router.get('/fp3d/winners', (ctx, next) => {
  ctx.response.type = 'json'
  ctx.response.body = {
    code: 0,
    data: utils.getWinnerData()
  }
  return
})

module.exports = router

