<template>
  <div class="recordBox index-container">
    <headers/>
    <div class="recordListBox">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>时间</th>
          <th>币种</th>
          <th>数量</th>
          <th>地址</th>
          <th>状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in data">
          <td>{{(item.createTime).split('T')[0]}}</td>
          <td>ETH</td>
          <td>{{item.ethCount}}</td>
          <td>{{item.walletId}}</td>
          <td>{{item.dividend == '3' ? '审核中' : (item.dividend == '4' ? '失败' : '成功')}}</td>
        </tr>
        <tr v-if="data.length <= 0">
          <td colspan="5" style="text-align: center;line-height: 140px;">没有相关记录</td>
        </tr>
        </tbody>
        <div class="f5" @click="initWalletFn()"><a>刷新资产</a></div>
      </table>
    </div>
  </div>
</template>

<script>
import headers from '../components/header'
export default {
  components: {
    headers
  },
  name: 'record',
  data: function () {
    return {
      type: '',
      data: [],
      user: ''
    }
  },
  mounted () {
    this.type = this.$route.query.type
    this.user = JSON.parse(localStorage.userInfo)
    this.initrecordListFn()
  },
  methods: {
    initrecordListFn: function () {
      let _this = this
      let obj = {
        status: _this.type,
        userid: _this.user.userId
      }
      _this.$axios.post('/index/jlsj', obj).then(function (result) {
        if (result.code == 0) {
          _this.data = result.data
        } else {
          _this.$modal(result.msg)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    initWalletFn: function () {
      let _this = this
      _this.$axios.post('/transactions').then(function (result) {
        _this.$modal('刷新成功')
        if (result.code == 0) {
          _this.$modal('刷新成功')
        } else {
          _this.$modal(result.msg)
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .f5{
    top: 8px;
    right: 5px;
    position: absolute;
    color: #fff;
  }
  a{
  color: rgb(114, 145, 161);
  }
  a:hover, a:focus {
    color: #5662D1;
    outline: none;
    text-decoration: none;
  }
  .recordListBox{
    width: 1220px;
    padding: 20px 30px;
    background: rgba(31,43,52,.8);
    margin: 10px auto;
    min-height: 600px;
  }
  .table-bordered{
    width: 100%;
    color: #fff;
    font: normal 14px/24px 'Microsoft YaHei';
    position: relative;
  }
  .table-bordered tr{
    line-height: 40px;
  }
  .table-bordered thead tr{
    color: rgb(114, 145, 161);
  }
</style>
