<template>
    <div class="index-container">
      <headers/>
      <div class="infoBox">
        <div class="leftNav">
          <ul>
            <li :class="type == 1 ? 'curr' : ''" @click="type = 1">{{$t('userinfo.nav1')}}</li>
            <li :class="type == 2 ? 'curr' : ''" @click="type = 2">{{$t('userinfo.nav2')}}</li>
            <li :class="type == 3 ? 'curr' : ''" @click="type = 3">{{$t('userinfo.nav3')}}</li>
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
                <span>{{InLink}}</span>
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
        </div>
      </div>
    </div>
</template>

<script>
import headers from '../components/header'
export default {
  components: {
    headers
  },
  name: 'info',
  data: function () {
    return {
      type: '1', // tab切换
      actState: true, // 邀请链接是否激活
      InLink: 'www.baidu.com', // 专属邀请链接
      balance: 0.00, // 钱包余额
      linkData: [{ // 邀请返利数据
        userInfo: 'All***',
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
        }
      ]
    }
  },
  mounted () {

  },
  methods: {
    activationLinkFn: function () { //激活邀请链接
      let _this = this
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
