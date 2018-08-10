<template>
  <div class="index-container">
    <headers/>
    <div class="helpBox">
      <!--<div class="leftNav">-->
      <!--<ul>-->
      <!--<li>使用指南</li>-->
      <!--<li>游戏规则</li>-->
      <!--</ul>-->
      <!--</div>-->
      <div class="helpTxtBox">
        <div class="help1" v-html="content">
          <!--<span>游戲規則</span><br><br><br>-->
        </div>
        <br>
        <br>
      </div>
      <!--<div class="NoticeBox"><br>-->
        <!--<span>公告</span><br><br>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import headers from '../components/header'

export default {
  name: 'help',
  components: {
    headers
  },
  data: function () {
    return {
      type: 0,
      content: ''
    }
  },
  mounted () {
    if (!!this.$route.query.type){
      this.type = 0
    } else {
      this.type = 1
    }
    this.initData()
  },
  methods: {
    initData: function () {
      let _this = this
      let obj = {
        type: _this.type,
        lang: localStorage.lang === 'zh' ? 0 : 1
      }
      _this.$newAxios.post('/getnoticelist', obj).then(function (result) {
        let data = result.data || result
        if (result.code === 0) {
          _this.content = data[0].content
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
  * {
    color: #fff;
  }
.NoticeBox{
  display: none;
  margin-bottom: 60px;
  background: -ms-linear-gradient(top, #2b3264 0, #2b3264 100%);
  background: -webkit-linear-gradient(top, #2b3264 0, #2b3264 100%);
  background: -moz-linear-gradient(top, rgba(43, 50, 100, 1), rgba(43, 50, 100, .1));
  background: -o-linear-gradient(rgba(43, 50, 100, 1), rgba(43, 50, 100, .1));
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(43, 50, 100, 1)), to(rgba(43, 50, 100, .1)));
  padding: 20px 50px 20px;
  font: normal 14px/24px 'Microsoft YaHei';
  min-height: 600px;
}
  .helpBox {
    width: 1040px;
    margin: 30px auto 60px;
    padding-bottom: 60px;
    /*overflow: hidden;*/
  }

  .helpTxtBox span,  .NoticeBox span{
    font: normal 20px/24px 'Microsoft YaHei'!important;
  }

  .helpTxtBox {
    display: block;
    margin-bottom: 10px;
    background: -ms-linear-gradient(top, #2b3264 0, #2b3264 100%);
    background: -webkit-linear-gradient(top, #2b3264 0, #2b3264 100%);
    background: -moz-linear-gradient(top, rgba(43, 50, 100, 1), rgba(43, 50, 100, .1));
    background: -o-linear-gradient(rgba(43, 50, 100, 1), rgba(43, 50, 100, .1));
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(43, 50, 100, 1)), to(rgba(43, 50, 100, .1)));
    padding: 40px 50px 20px;
    font: normal 14px/24px 'Microsoft YaHei';
  }
</style>
