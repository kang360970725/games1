const router = require('koa-router')()
const utils = require('../utils')
const store = require('../events/store')
const EVENTS = require('../events/events')
const errors = require('../../src/lib/errors')

const NETWORK = process.env.NETWORK

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

router.get('/fp3d/luckies', async (ctx, next) => {
  ctx.response.type = 'json'
  let luckies = []
  try {
    luckies = await store.loadEventData(EVENTS.LUCKY, NETWORK)
    ctx.response.body = {
      code: 0,
      data: luckies
    }
  } catch (err) {
    console.error(`fail to get luckies data`, err)
    ctx.response.body = {
      code: errors.UNKNOWN_ERROR,
      data: luckies
    }
  }
})

router.get('/fp3d/g_stat', async (ctx, next) => {
  ctx.response.type = 'json'
  let ret = {}
  try {
    ret = await store.loadGStat(ctx.query.player, NETWORK)
    ctx.response.body = {
      code: 0,
      data: ret.length > 0 ? ret[0] : {}
    }
  } catch (err) {
    console.error(`fail to get luckies data`, err)
    ctx.response.body = {
      code: errors.UNKNOWN_ERROR,
      data: ret
    }
  }
})

router.get('/fp3d/random_players', async (ctx, next) => {
  ctx.response.type = 'json'
  let players = []
  try {
    players = await store.selectRandomPlayers(NETWORK)
    ctx.response.body = {
      code: 0,
      data: players.map(t => {return t.buyer })
    }
  } catch (err) {
    console.error(`fail to get luckies data`, err)
    ctx.response.body = {
      code: errors.UNKNOWN_ERROR,
      data: players
    }
  }
})
module.exports = router

