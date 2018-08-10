<template>
  <div class="nav-content position clearfix">
    <p class="mobileindex-logo l">
      <a href="" target="_blank" :title="$t('common.home')">
        <img src="../assets/images/logo.png">
      </a>
      <a href="" title="GamBling">
        <!--<img src="./TalkingData移动观象台—全球领先免费公开数据实时查询平台_files/logo-ovservatory.png" alt="mi.talkingdata.com"-->
        <!--title="移动观象台首页">-->
      </a>
    </p>
    <div class="top-menu trans l">
      <ul>
        <li><a href="/">{{$t('common.home')}}</a></li>
        <li><a href="/help?type=notice">{{$t('common.notice')}}</a></li>
        <li><a target="_blank" href="https://ropsten.etherscan.io/tx/0x10b3d03ab602800f4ea20bc786ba59ad8cdbea27fae03959f5b76296f082dee1">{{$t('common.contract')}}</a></li>
        <li><a href="/info?s=c">{{$t('userinfo.nav1Txt1')}}</a></li>
        <li v-if="admin"><a href="/admin?a=b">公告管理</a></li>
      </ul>
    </div>
    <div class="r header-operate-container">
      <div class="operate-right">
        <a class="" href="/info?t=s" :title="$t('common.community')">{{$t('common.community')}}</a>
      </div>
      <div class="operate-right">
        <a class="" href="/help?s=c" :title="$t('common.help')">{{$t('common.help')}}</a>
      </div>
      <div class="operate-right account-container to-login">  <!--已登录-->
        <!--<a title="">Welcome,&nbsp;&nbsp;{{user.userName}}</a>-->
        <!--<b class="line"></b>-->
        <a href="/info?s=c" :title="$t('common.userinfo')">{{$t('common.userinfo')}}</a>
        <b class="line"></b>
        <!--<a @click="logout()" :title="$t('common.exit')">{{$t('common.exit')}}</a>-->
      </div>

      <div class="operate-right">
        <a href="javascript:void(0)" class="language" @click="changeLanguage()">{{$i18n.locale === 'zh' ? 'ZH' : 'EN'}}</a>
      </div>
    </div>
    <div class="showMsgModal">
        <span>123456</span>
      <i></i>
    </div>
    <div class="shequnBox">

    </div>
  </div>
</template>

<script>
export default {
  name: 'headers',
  data: function () {
    return {
      user: '',
      admin: false
    }
  },
  mounted () {
    if (!!localStorage.userInfo) {
      this.user = JSON.parse(localStorage.userInfo)
    }
    let address = sessionStorage.address
    if (address == '0x8470FFfbfDb4F3d1986163edBDb2018C75D8b31F') {
      this.admin = true
    } else {
      this.admin = false
    }
  },
  methods: {
    changeLanguage: function () {
      let lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = lang
      localStorage.setItem('lang' , lang)
      window.location.reload()
    }
  }
}
</script>

<style scoped>
  li{
    list-style: none;
  }
  .icon-question{
    background-image: url('../assets/images/help.png');
    background-size: 100%;
    width: 20px;
    height: 19px;
  }
  .icon-question:hover{
    background-image: url('../assets/images/help2.png');
  }
  .showMsgModal{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 400px;
    height: 40px;
    background: rgba(0,0,0,0.3);
    text-align: center;
    line-height: 40px;
    margin: 20px auto;
    border-radius: 2px;
    display: none;
    color: #fff;
    z-index: 999999;
  }
  .showMsgModal span{
    color: #fff;
    font-size: 15px;
  }
  .showMsgModal i{
    width: 100%;
    height: 3px;
    background: #ff0000;
    display: block;
  }

  @keyframes myfirst
  {
    0% {
      background: #228B22;
      width: 100%;
    }
    100% {
      background: #228B22;
      width: 0;
    }
  }

  @-moz-keyframes myfirst /* Firefox */
  {
    0% {
      background: #228B22;
      width: 100%;
    }
    100% {
      background: #228B22;
      width: 0;
    }
  }

  @-webkit-keyframes myfirst /* Safari 和 Chrome */
  {
    0% {
      background: #228B22;
      width: 100%;
    }
    100% {
      background: #228B22;
      width: 0;
    }
  }

  @-o-keyframes myfirst /* Opera */
  {
    0% {
      background: #228B22;
      width: 100%;
    }
    100% {
      background: #228B22;
      width: 0;
    }
  }

  .showMsgModal>i{
    animation: myfirst 3s;
    -moz-animation: myfirst 3s;	/* Firefox */
    -webkit-animation: myfirst 3s;	/* Safari 和 Chrome */
    -o-animation: myfirst 3s;
  }

</style>
