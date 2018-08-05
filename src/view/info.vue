<template>
    <div class="index-container">
      <headers/>
      <div class="infoBox">
        <div class="leftNav">
          <ul>
            <li :class="type == 1 ? 'curr' : ''" @click="type = 1">{{$t('userinfo.nav1')}}</li>
            <li :class="type == 2 ? 'curr' : ''" @click="type = 2">{{$t('userinfo.nav2')}}</li>
            <li :class="type == 3 ? 'curr' : ''" @click="type = 3">{{$t('userinfo.nav3')}}</li>
            <li :class="type == 4 ? 'curr' : ''" @click="type = 4">{{$t('userinfo.nav4')}}</li>
          </ul>
        </div>
        <div class="contentBox">
          <div class="Invitation-info" v-show="type == 1">
            <p class="title">{{$t('userinfo.nav1tit')}}</p>
            <div v-if="!actState">
              <br>
              <label>
                <span>{{$t('userinfo.nav1Txt1')}} : </span>
                <span>{{$t('userinfo.nav1Txt2')}}</span>
              </label>
              <br>
              <br>
              <label>
                <span></span>
              </label>
              <button class="button" @click="activationLinkFn()">{{$t('userinfo.nav1btn')}}</button>
            </div>
            <div v-if="actState">
              <label>
                <span>{{$t('userinfo.nav1Txt1')}} : </span>
                <span>{{InLink}} &nbsp;&nbsp;&nbsp; <a style="color: #49dc93;" @click="copyCodeFn">复制</a></span>
              </label>
              <br>
              <table class="ordersTab">
                <thead>
                <tr>
                  <th width="50%">{{$t('userinfo.tabInTit1')}}</th>
                  <th width="50%">{{$t('userinfo.tabInTit2')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in linkData">
                  <td>{{item.userInfo}}</td>
                  <td>{{item.bonus}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="acc-info" v-show="type == 2">
            <p class="title">{{$t('userinfo.nav2tit')}}</p>
            <br>
            <br>
            <label>
              <span>{{$t('userinfo.nav2Txt')}}:</span>
              <input type="text" disabled="disabled" v-model="balance" placeholder="0.0000"/>
              <button @click="withdrawal(context.address)" class="button">提现</button>
            </label>
            <br>
            <br>
            <label>
              <span></span>
            </label>
          </div>
          <div class="purse-record" v-show="type == 3">
            <p class="title">{{$t('userinfo.nav3tit')}}</p>
            <br>
            <table class="ordersTab">
              <thead>
              <tr>
                <th width="20%">{{$t('userinfo.tabTit1')}}</th>
                <th width="20%">{{$t('userinfo.tabTit2')}}</th>
                <th width="20%">{{$t('userinfo.tabTit3')}}</th>
                <th width="20%">{{$t('userinfo.tabTit4')}}</th>
                <th width="20%">{{$t('userinfo.tabTit5')}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in orders">
                <td>{{item.num}}</td>
                <td>{{item.keyNum}}</td>
                <td>{{item.bonusKey}}</td>
                <td>{{item.bonusR}}</td>
                <td>{{item.bonusJ}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="Invitation-info" v-show="type == 4">
            <p class="title">{{$t('userinfo.nav4')}}</p>
            <div v-html="comHtml">
            </div>
          </div>
        </div>
      </div>
      <div id="biao1" style="display: none;"></div>
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
  name: 'info',
  data: function () {
    return {
      type: '1', // tab切换
      actState: false, // 邀请链接是否激活
      InLink: 'https://fomo888.io', // 专属邀请链接
      comHtml: '', // 社群信息
      selfId: 0,
      refId: 0,
      balance: 0.00, // 钱包余额
      linkData: [{ // 邀请返利数据
        userInfo: 'All***',
        bonus: '0.00'
      },{ // 邀请返利数据
        userInfo: 'Zha***',
        bonus: '0.00'
      },{ // 邀请返利数据
        userInfo: 'Liu***',
        bonus: '0.00'
      }],
      orders: [   //每轮购买数据
        {
          num: 1, //第几轮
          keyNum: 0, //Key持有数
          bonusKey: 0, //Key分红
          bonusR: 0, //888排名分红
          bonusJ: 0 //奖池大奖分红
        },
        {
          num: 2, //第几轮
          keyNum: 0, //Key持有数
          bonusKey: 0, //Key分红
          bonusR: 0, //888排名分红
          bonusJ: 0 //奖池大奖分红
        },
        {
          num: 3, //第几轮
          keyNum: 0, //Key持有数
          bonusKey: 0, //Key分红
          bonusR: 0, //888排名分红
          bonusJ: 0 //奖池大奖分红
        },
        {
          num: 4, //第几轮
          keyNum: 0, //Key持有数
          bonusKey: 0, //Key分红
          bonusR: 0, //888排名分红
          bonusJ: 0 //奖池大奖分红
        },
        {
          num: 5, //第几轮
          keyNum: 0, //Key持有数
          bonusKey: 0, //Key分红
          bonusR: 0, //888排名分红
          bonusJ: 0 //奖池大奖分红
        },
        {
          num: 5, //第几轮
          keyNum: 0, //Key持有数
          bonusKey: 0, //Key分红
          bonusR: 0, //888排名分红
          bonusJ: 0 //奖池大奖分红
        },
        {
          num: 5, //第几轮
          keyNum: 0, //Key持有数
          bonusKey: 0, //Key分红
          bonusR: 0, //888排名分红
          bonusJ: 0 //奖池大奖分红
        },
        {
          num: 5, //第几轮
          keyNum: 0, //Key持有数
          bonusKey: 0, //Key分红
          bonusR: 0, //888排名分红
          bonusJ: 0 //奖池大奖分红
        },
        {
          num: 5, //第几轮
          keyNum: 0, //Key持有数
          bonusKey: 0, //Key分红
          bonusR: 0, //888排名分红
          bonusJ: 0 //奖池大奖分红
        },
        {
          num: 5, //第几轮
          keyNum: 0, //Key持有数
          bonusKey: 0, //Key分红
          bonusR: 0, //888排名分红
          bonusJ: 0 //奖池大奖分红
        },
        {
          num: 5, //第几轮
          keyNum: 0, //Key持有数
          bonusKey: 0, //Key分红
          bonusR: 0, //888排名分红
          bonusJ: 0 //奖池大奖分红
        },
        {
          num: 5, //第几轮
          keyNum: 0, //Key持有数
          bonusKey: 0, //Key分红
          bonusR: 0, //888排名分红
          bonusJ: 0 //奖池大奖分红
        }
      ]
    }
  },
  mounted () {
    etherEnv.Init(window.web3)
      .then(cxt => {
        this.context = cxt
        return fp3dMod.getFp3d(cxt.web3)
      })
      .then(_fp3d => {
        this.context.fp3d = _fp3d
        return _fp3d.userReferId(this.context.address)
      })
      .then(_id => {
        this.selfId = _id
        if (_id.eq(0)) {
          this.actState = false
        } else {
          this.actState = true
          this.InLink = this.refUrl(_id)
        }
        return this.loadUserData()
      })
      .then(() => {
        return this.context.fp3d.totalProfit(this.context.address)
          .then(_profit => {
            this.balance = _profit.dividedBy(Math.pow(10, 18)).toNumber()
          })
      })

    if (this.$route.query.t == 's'){
      this.type = 4
    }
    this.initData()
  },
  methods: {
    activationLinkFn: function () { //激活邀请链接
      let _this = this
      return _this.context.fp3d.register(this.refId)
    },
    loadUserData() {
      return this.context.fp3d.loadPlayerAllRound(this.context.address)
        .then(_roundData => {
          return this.context.fp3d.loadAllRound()
            .then(_rounds => {
              for(let i = 0; i < _roundData.length; i ++) {
                this.orders[i].num = i + 1
                this.orders[i].keyNum = _roundData[i].keys
                this.orders[i].bonusR = _roundData[i].lucky
                this.orders[i].bonusJ = _roundData[i].win

                this.context.fp3d.roundProfit(this.context.address, i)
                  .then(_profit => {
                    this.orders[i].bonusKey = _profit.dividedBy(Math.pow(10, 18)).toNumber()
                  })
              }
            })
        })
    },
    refUrl(refId) {
      return `http://www.fomo888.com/r=${refId}`
    },
    withdrawal(address) {
      return this.context.fp3d.withdrawal(address)
        .catch(err => {
          if (err == 16) {
            alert(`提现小于最小额度`)
          }
        })
    },
    copyCodeFn: function () {
      let _this = this
      // let txt = window.location.origin + '/register?invitcode=' + _this.user.inviteCode
      let txt = _this.InLink
      $('#biao1').text(txt)
      var Url2 = document.getElementById('biao1').innerText
      var oInput = document.createElement('input')
      oInput.value = Url2
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      alert('复制成功')
    },
    initData: function () {
      let _this = this
      let obj = {
        type: 2,
        lang: localStorage.lang === 'zh' ? 0 : 1
      }
      _this.$axios.post('/getnoticelist', obj).then(function (result) {
        let data = result.data || result
        if (result.code === 0) {
          _this.comHtml = data[0].content
        } else {
          // alert(data.msg)
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .ordersTab{
    width: 100%;
    border: 1px solid #40497b;
    margin: 0 auto;
  }
  .ordersTab tr{
    color: #fff;
    text-align: center;
    border-bottom: 1px solid #40497b;
  }
  .ordersTab tr th{
    background: rgb(54, 63, 111);
  }
  .ordersTab tr td,.ordersTab tr th{
    line-height: 35px;
    color: #fff;
    text-align: center;
    border-bottom: 1px solid #40497b;
  }
.infoBox{
  width: 1280px;
  margin: 30px auto 0;
  overflow: hidden;
}
  .leftNav {
  width: 112px;
  float: left;
  border: 1px solid #181b2e;
  padding: 0 4px;
  border-bottom: 0;
  background: -ms-linear-gradient(top, #222652 100%, #222652 0);
  background: -webkit-linear-gradient(top, #222652 100%, #222652 0);
  background: -moz-linear-gradient(top, rgba(34, 38, 82, 1), rgba(34, 38, 82, .1));
  background: -o-linear-gradient(rgba(34, 38, 82, 1), rgba(34, 38, 82, .1));
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(34, 38, 82, 1)), to(rgba(34, 38, 82, .1)));
  }

  .leftNav ul {
  text-align: center;
  zoom: 1;
  min-height: 180px;
  padding: 20px 0;
  }

  .leftNav ul li {
  list-style: none;
  clear: both;
  line-height: 26px;
  font-size: 15px;
  color: #acb5e5;
  text-decoration: none;
  padding: 7px 0;
  margin-bottom: 10px;
  display: block;
  cursor: pointer;
  }

  .leftNav ul li:hover,.leftNav ul li.curr{
  color: #fff;
  background: #353d75;
  }

.contentBox {
  width: 930px;
  min-height: 400px;
  color: #fff;
  margin-left: 30px;
  display: block;
  float: left;
  margin-bottom: 10px;
  background: -ms-linear-gradient(top, #2b3264 0, #2b3264 100%);
  background: -webkit-linear-gradient(top, #2b3264 0, #2b3264 100%);
  background: -moz-linear-gradient(top, rgba(43, 50, 100, 1), rgba(43, 50, 100, .1));
  background: -o-linear-gradient(rgba(43, 50, 100, 1), rgba(43, 50, 100, .1));
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(43, 50, 100, 1)), to(rgba(43, 50, 100, .1)));
  padding: 20px 50px 20px;
  font: normal 14px/24px 'Microsoft YaHei';
}
  .title{
    color: #acb5e5;
    font: normal 18px/30px 'Microsoft YaHei';
    margin-bottom: 20px;
  }
  label{
    display: block;
    font: normal 15px/30px 'Microsoft YaHei';
    color: #e2e2e2;
    margin-left: 30px;
  }
  input{
    border-bottom: 1px solid #666;
    height: 26px;
    width: 360px;
    background: none;
    color: #e2e2e2;
    font: normal 15px/26px 'Microsoft YaHei';
    padding-left: 5px;
  }
  .button:hover{
    background: #719cff;
  }
  .button{
    width: 140px;
    line-height: 35px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    background: #0093fe;
    margin-left: 60px;
  }

</style>
