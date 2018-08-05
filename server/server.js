/* eslint-disable */

const Koa = require('koa')
const app = new Koa()
const Web3 = require('web3')
const route = require('koa-route')
const web3 = new Web3()
const RopstenWeb3 = new Web3()
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const errors = require('../src/lib/errors')
const Fp3d = require('../src/lib/fp3d_mod')
const utils = require('./utils')

const networkMap = {
  '1': 'mainnet',
  '3': 'ropsten'
}

const current = process.env.NETWORK

web3.setProvider(new web3.providers.HttpProvider(`https://${networkMap[current]}.infura.io/vAugb8H4cG1bOuFMZj3y`))

// RopstenWeb3.setProvider(new RopstenWeb3.providers.HttpProvider(`https://ropsten.infura.io/vAugb8H4cG1bOuFMZj3y`))


/*
Fp3d.getFp3d(web3)
    .then(_fp3c => {
        utils.initFp3d(_fp3c)
    })
    .catch(err => {
        console.log(`init fp3d failed`, err)
        process.exit(-1)
    })
*/
app.use(cors())
app.use(koaBody())

app.use((ctx, next) => {
  console.log(`==${ctx.url}`)
  ctx.response.type = 'json'
  return next()
})

const fp3dRouter = require('./router/fp3d')
app.use(fp3dRouter.routes())

app.listen(4357)
