<template>
  <div>
    <div class="index-container onepage-wrapper" style="position: relative;">
      <headers/>
      <div class="page page1 section active" data-index="1">
        <div class="gameList" v-for="(item,index) in gameList" v-show="item.state">
          <h5>{{index + 1}}</h5>
          <div class="time-number position">
            <h4>{{$t('common.time')}}</h4>
            <div class="clearfix" :class="'time-number'+index"></div>
          </div>
          <div class="gameListR">
            <div class="user-number position ">
              <h4>{{$t('common.CountPrice')}}</h4>
              <div class="POTCount clearfix" :class="'mobile-numbers'+index"></div>
            </div>
            <div class="data-summary-container">
              <div class="blue-border">
                <b></b>
                <b></b>
                <b></b>
                <b></b>
              </div>
              <a class="data-summary" href="javascript:;">
                <span><i class="icon-wechat"></i></span>
                <dl>
                  <dt>{{$t('common.salesCount')}}</dt>
                  <dd>{{item.totalInvestment > 0 ? item.totalInvestment.toFixed(6) : item.totalInvestment }}
                  </dd>
                </dl>
              </a>
            </div>
            <div class="data-summary-container">
              <div class="blue-border">
                <b></b>
                <b></b>
                <b></b>
                <b></b>
              </div>
              <a class="data-summary" href="javascript:;">
                <span><i class="icon-wechat"></i></span>
                <dl>
                  <dt>{{$t('common.reverse')}}</dt>
                  <dd>{{item.surplus}}
                  </dd>
                </dl>
              </a>
            </div>
            <div class="search-apply position">
              <div class="search-container clearfix">
                <label>{{$t('common.current')}}： {{item.unitPrice}}</label>
                <input type="text" :placeholder="$t('common.purchasePl')" class="l" v-model="item.buyNumber"
                       onkeyup="this.value=this.value.replace(/\D/g,'')" :disabled="item.finalized">
                <button v-if="!item.finalized" class="trans" @click="buyKeysfn(index)">{{$t('common.purchase')}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" style="height: 120px;width: 100%;">
      &nbsp;
    </div>
    <div class="rollingBox">
      <div class="border3">
        <p v-for="item in rollList">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import headers from '../components/header'
const etherEnv = require('@/lib/etherEnv')
const fp3dMod = require('@/lib/fp3d_mod')
const async = require('async')

export default {
  components: {
    headers
  },
  name: 'index',
  data: function () {
    return {
      gameList: [
        {
          time: '1533130612000', // 倒计时(毫秒值)
          jackpot: '0.00', // 奖池资金
          totalInvestment: '0.00', // 总投入资产
          unitPrice: '0.00', // key单价
          surplus: '888', // 888倒计数
          state: true, // 是否开启
          finalized: true, // 是否可以购买
          buyNumber: '' // 购买数
        },
        {
          time: '1533170539000', // 倒计时(毫秒值)
          jackpot: '0.00', // 奖池资金
          totalInvestment: '0.00', // 总投入资产
          unitPrice: '0.00', // key单价
          surplus: '888', // 888倒计数
          state: false, // 是否开启
          finalized: false, // 是否可以购买
          buyNumber: '' // 购买数
        },
        {
          time: '1533159675000', // 倒计时(毫秒值)
          jackpot: '0.00', // 奖池资金
          totalInvestment: '0.00', // 总投入资产
          unitPrice: '0.00', // key单价
          surplus: '888', // 888倒计数
          state: false, // 是否开启
          finalized: false, // 是否可以购买
          buyNumber: '' // 购买数
        },
        {
          time: '1533159675000', // 倒计时(毫秒值)
          jackpot: '0.00', // 奖池资金
          totalInvestment: '0.00', // 总投入资产
          unitPrice: '0.00', // key单价
          surplus: '888', // 888倒计数
          state: false, // 是否开启
          finalized: false, // 是否可以购买
          buyNumber: '' // 购买数
        },
        {
          time: '1533159675000', // 倒计时(毫秒值)
          jackpot: '0.00', // 奖池资金
          totalInvestment: '0.00', // 总投入资产
          unitPrice: '0.00', // key单价
          surplus: '888', // 888倒计数
          state: false, // 是否开启
          finalized: false, // 是否可以购买
          buyNumber: '' // 购买数
        },
        {
          time: '1533159675000', // 倒计时(毫秒值)
          jackpot: '0.00', // 奖池资金
          totalInvestment: '0.00', // 总投入资产
          unitPrice: '0.00', // key单价
          surplus: '888', // 888倒计数
          state: false, // 是否开启
          finalized: false, // 是否可以购买
          buyNumber: '' // 购买数
        },
        {
          time: '1533159675000', // 倒计时(毫秒值)
          jackpot: '0.00', // 奖池资金
          totalInvestment: '0.00', // 总投入资产
          unitPrice: '0.00', // key单价
          surplus: '888', // 888倒计数
          state: false, // 是否开启
          finalized: false, // 是否可以购买
          buyNumber: '' // 购买数
        },
        {
          time: '1533159675000', // 倒计时(毫秒值)
          jackpot: '0.00', // 奖池资金
          totalInvestment: '0.00', // 总投入资产
          unitPrice: '0.00', // key单价
          surplus: '888', // 888倒计数
          state: false, // 是否开启
          finalized: false, // 是否可以购买
          buyNumber: '' // 购买数
        },
        {
          time: '1533159675000', // 倒计时(毫秒值)
          jackpot: '0.00', // 奖池资金
          totalInvestment: '0.00', // 总投入资产
          unitPrice: '0.00', // key单价
          surplus: '888', // 888倒计数
          state: false, // 是否开启
          finalized: false, // 是否可以购买
          buyNumber: '' // 购买数
        },
        {
          time: '1533159675000', // 倒计时(毫秒值)
          jackpot: '0.00', // 奖池资金
          totalInvestment: '0.00', // 总投入资产
          unitPrice: '0.00', // key单价
          surplus: '888', // 888倒计数
          state: false, // 是否开启
          finalized: false, // 是否可以购买
          buyNumber: '' // 购买数
        },
        {
          time: '1533159675000', // 倒计时(毫秒值)
          jackpot: '0.00', // 奖池资金
          totalInvestment: '0.00', // 总投入资产
          unitPrice: '0.00', // key单价
          surplus: '888', // 888倒计数
          state: false, // 是否开启
          finalized: false, // 是否可以购买
          buyNumber: '' // 购买数
        },
        {
          time: '1533159675000', // 倒计时(毫秒值)
          jackpot: '0.00', // 奖池资金
          totalInvestment: '0.00', // 总投入资产
          unitPrice: '0.00', // key单价
          surplus: '888', // 888倒计数
          state: false, // 是否开启
          finalized: false, // 是否可以购买
          buyNumber: '' // 购买数
        }
      ],
      refId: 0,
      selfId: 0,
      rollList: ['第一轮 Liu***获得了第888位奖励' , '第一轮 All***成功夺得了最终奖池']
    }
  },
  mounted () {
    const _this = this

    if (!!this.$route.query.r){
      this.refId = this.$route.query.r
    }
    etherEnv.Init(window.web3)
      .then(cxt => {
        _this.context = cxt
        return fp3dMod.getFp3d(cxt.web3)
      })
      .then(_fp3d => {
        _this.context.fp3d = _fp3d
        _this.initViewDataFn()
        setInterval(() => {
          _this.initViewDataFn()
        }, 30 * 1000)
      })
      .catch(err => {
        console.error(`fail`, err)
      })

    for (let i in _this.gameList) {
      _this.gameList[i].numberAnimates = $('.mobile-numbers' + i).numberAnimate({
        num: _this.gameList[i].jackpot + '',
        speed: 800,
        symbol: ',',
        dot: 0
      })
      _this.gameList[i].timeAnimates = $('.time-number' + i).numberAnimate({
        num: '240000',
        speed: 800,
        symbol: ' : ',
        symbolNum: '2',
        dot: 0
      })
    }
    setInterval(function () {
      _this.initDataTxtFn()
    }, 1000)
  },
  methods: {
    buyKeysfn: function (_round) { // 鑰匙購買
      let _this = this
      if (_this.time == 0) {
        _this.$modal('即将开启,敬请期待!')
        return
      }
      let keys = new _this.context.BigNumber(_this.gameList[_round].buyNumber || 0)
      keys = keys.mul(_this.context.fp3d.params.decimals)
      return _this.context.fp3d.ethForKey(keys, _round)
        .then(_value => {
          return _this.context.fp3d.buy(_round, _value, this.refId)
        })
    },
    initViewDataFn: function () {
      const _this = this
      const fp3d = _this.context.fp3d
      return fp3d
        .loadAllRound()
        .then(_rounds => {
          for(let i = 0; i < _rounds.length; i ++) {
            _this.gameList[i].jackpot = _rounds[i].pool.dividedBy(Math.pow(10, 18)).toNumber()
            _this.gameList[i].totalInvestment = _rounds[i].eth.dividedBy(Math.pow(10, 18)).toNumber()
            // _this.gameList[i].unitPrice
            _this.gameList[i].surplus = _rounds[i].nextLucky.sub(_rounds[i].luckyCounter).toNumber()
            _this.gameList[i].state = _rounds[i].activated
            _this.gameList[i].finalized = _rounds[i].finalized
            // _this.gameList[i].buyNumber = _rounds[i].keys.toNumber()
            if (_rounds[i].activated && !_rounds[i].finalized) {
              fp3d.remainTime(i)
                .then(_time => {
                  _this.gameList[i].time = _time.mul(1000).toNumber()
                })
            }

            fp3d.ethForKey(fp3d.params.decimals, i)
              .then(_eth => {
                _this.gameList[i].unitPrice = _eth.dividedBy(Math.pow(10, 18)).toNumber()
              })
          }
        })
    },
    initDataTxtFn: function () { // 初始化时间
      let _this = this
      for (let i in _this.gameList) {
        let time = parseInt(_this.gameList[i].time) - 1000
        _this.gameList[i].time = time
        if (_this.gameList[i].time <= 0 || time <= 0) {
          time = 0
        }
        time = (time > 86400000 ? 900 : time)
        let h = (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        h = parseInt(h) + ''
        let m = (time % (1000 * 60 * 60)) / (1000 * 60)
        m = parseInt(m) + ''
        let s = (time % (1000 * 60)) / 1000
        s = parseInt(s) + ''
        let txt = (h.length === 1 ? ('0' + h) : h) + (m.length === 1 ? ('0' + m) : m) + (s.length === 1 ? ('0' + s) : s)
        _this.gameList[i].timeAnimates.resetData(txt + '')
        _this.gameList[i].numberAnimates.resetData(_this.gameList[i].jackpot + '')
      }
    }
  }
}
</script>

<style scoped>
  @-webkit-keyframes scrollText1 {
    0% {
      -webkit-transform: translateY(200%);
    }
    100% {
      -webkit-transform: translateY(0%);
    }
  }

  @keyframes scrollText1 {
    0% {
      transform: translateY(200%);
    }
    100% {
      transform: translateY(0%);
    }
  }
  .border3{
    top: 0px;
    -webkit-animation:scrollText1 3s 1;
    animation:scrollText1 3s 1;
  }

  .rollingBox{
    position: fixed;
    right: 30px;
    bottom: 40px;
    height: 104px;
    overflow: hidden;
  }
  .rollingBox p{
    background: #438006;
    border-radius: 3px;
    padding: 5px 15px;
    color: #fff;
    font-size: 16px;
    margin: 12px 0;
  }
  .gameOverBox h5{
    font: normal 24px/40px '';
    color: red;
    display: block;
    margin-bottom: 40px;
  }
  .gameOverBox span{
    font: normal 16px/40px '';
    margin: 20px auto 0;
    display: block;
  }
  .gameOverBox a{
    font: normal 35px/34px 'Microsoft YaHei';
    color: #1b1f2d;
    position: absolute;
    right: 5px;
    top: 0;
    cursor: pointer;
  }
  .gameOverBox{
    display: none;
    position: fixed;
    width: 500px;
    height: 260px;
    top: 30%;
    margin: auto;
    left: 0;
    right: 0;
    text-align: center;
    padding: 50px;
    background: rgba(255,255,255,.8);
    z-index: 99999;
  }
  .rechargeShowBox {
    display: none;
    position: fixed;
    margin: auto;
    left: 0;
    top: 60px;
    right: 0;
    bottom: 0;
    background: #fff;
    width: 480px;
    height: 490px;
    /*padding:0 40px 40px;*/
    border-radius: 5px;
    z-index: 99999;
  }
  .putShowBox {
    display: none;
    position: fixed;
    margin: auto;
    left: 0;
    top: 60px;
    right: 0;
    bottom: 0;
    background: #fff;
    width: 480px;
    height: 410px;
    /*padding:0 40px 40px;*/
    border-radius: 5px;
    z-index: 99999;
  }
  .rechargeTxt{
    padding:10px 40px 40px;
  }
  .rechargeTxt div{
    padding: 5px 0;
  }
  .rechargeTxt input{
    border-bottom: 1px solid #cfcfcf;
    width: 100%;
    font-size: 16px;
    color: #657180;
    line-height: 30px;
    margin-top: 5px;
    padding-top: 10px;
  }
  .rechargeTxt button:hover{
    background: #ad3c45;
  }
  .rechargeTxt button{
    width: 120px;
    text-align: center;
    line-height: 35px;
    background: #d8606a;
    color: #fff;
    margin: 30px 0 0;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
  }
  .modalBg{
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    left: 0;
    top: 0;
    z-index: 9999;
  }
  .modalTit{
    width: 100%;
    height: 40px;
    background: rgb(150, 147, 147);
  }
  .modalTit span{
    font: normal 15px/40px 'Microsoft YaHei';
    color: #1b1f2d;
    width: 80px;
    text-align: center;
    display: inline-block;
  }
  .modalTit a{
    font: normal 35px/34px 'Microsoft YaHei';
    color: #1b1f2d;
    position: absolute;
    right: 5px;
    top: 0;
    cursor: pointer;
  }
  .modalTit a:hover{
    color: #29439e;
  }
.rechargeTxt span{
  font: normal 15px/30px 'Microsoft YaHei';
}
.rechargeTxt a{
  font: normal 14px/30px 'Microsoft YaHei';
  float: right;
}
.rechargeTxt img{
  border: 1px solid #cfcfcf;
  width: 200px;
  height: 200px;
  margin: 10px 0;
  display: block;
  padding: 6px;
}
.wallet.position{
  background-size: contain;
  width: 220px;
  height: 70px;
  margin: 0 auto;
  line-height: 90px;
  font-size: 24px;
  color: #fff;
}
  .wallet.position span{
    display: block;
    width: 100%;
    font: normal 20px/90px 'Microsoft YaHei';
  }
  .percent-line button {
    width: 100px;
    line-height: 37px;
    background: #0093fe;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
  }
  .percent{
    width: 220px !important;
  }
  .percent .percent-line {
    width: 220px;
    margin: 10px auto 20px;
  }

  .percent.position .putForward {
    float: right;
    background: #d8606a;
  }

  .percent.position .putForward:hover {
    background: #ad3c45;
  }

  .percent.position .recharge:hover {
    background: #719cff;
  }
</style>
