<template>
  <div class="wrapper has-footer">
    <header class="header-top navbar fixed-top">
      <div class="top-bar">   <!-- START: Responsive Search -->
        <div class="container">
          <div class="main-search">
            <div class="input-wrap">
              <input class="form-control" type="text" placeholder="Search Here...">
              <a href="page-search.html"><i class="sli-magnifier"></i></a>
            </div>
            <span class="close-search search-toggle"><i class="ti-close"></i></span>
          </div>
        </div>
      </div>  <!-- END: Responsive Search -->

      <div class="navbar-header">
        <button type="button" class="navbar-toggle side-nav-toggle">
          <i class="ti-align-left"></i>
        </button>

        <a class="navbar-brand" href="/">
          <img src="../../assets/images/logo.png" style="width: 30px;height: auto;">
          <span>Fomo 888</span>
        </a>

        <ul class="nav navbar-nav-xs">  <!-- START: Responsive Top Right tool bar -->
          <li>
            <a href="javascript:;" class="collapse" data-toggle="collapse" data-target="#headerNavbarCollapse">
              <i class="sli-user"></i>
            </a>
          </li>
          <li>
            <a href="javascript:;" class="search-toggle">
              <i class="sli-magnifier"></i>
            </a>
          </li>

        </ul>   <!-- END: Responsive Top Right tool bar -->

      </div>

      <div class="collapse navbar-collapse" id="headerNavbarCollapse">

        <ul class="nav navbar-nav navbar-right">

          <li class="user-profile dropdown">
            <a href="javascript:;" class="clearfix dropdown-toggle" data-toggle="dropdown">
              <img src="" alt="" class="hidden-sm">
              <div class="user-name">超级管理员
              </div>
            </a>
          </li>

        </ul>

      </div><!-- END: Navbar-collapse -->

    </header>   <!-- END: Header -->

    <aside class="side-navigation-wrap sidebar-fixed">  <!-- START: Side Navigation -->
      <div class="sidenav-inner">

        <ul class="side-nav magic-nav">

          <li class="side-nav-header"></li>

          <li>
            <a href="/admin"><i class="sli-user"></i> <span class="nav-text">公告管理</span></a>
          </li>
        </ul>

      </div><!-- END: sidebar-inner -->

    </aside>    <!-- END: Side Navigation -->

    <div class="main-container">    <!-- START: Main Container -->

      <div class="content-wrap">  <!--START: Content Wrap-->

        <div class="row">

          <div class="col-md-12">
            <div class="button-list" style="width: 100%;">
              <button type="button" class="btn btn-secondary" style="margin: 10px 0 20px;" @click="addstate = true">新增</button>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <div class="panel-body">
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th width="15%">版块</th>
                      <th width="15%">版本</th>
                      <th width="55%">内容</th>
                      <th width="15%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in dataList">
                      <td>{{item.type == 0 ? '公告' : (item.type == 1 ? '教程' : '社群')}}</td>
                      <td>{{item.lang == 0 ? '中文' : '英文'}}</td>
                      <td><p>{{item.content}}</p></td>
                      <td>
                        <!--<a>修改</a>-->
                        <a @click="delFn(item.id)">删除</a>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>  <!--END: Content Wrap-->
      </div>  <!-- END: Main Container -->
      <div class="editDiv" v-if="addstate">
        <div class="modal-tit">添加内容</div>
        <div class="editorBox">
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption">
          </quill-editor>
        </div>
        <div class="labelList">
          <div class="form-group">
            <label class="col-sm-2 control-label">
              <span>版块：</span>
            </label>
            <div class="col-sm-9">
              <div class="customSelect">
                <select class="form-control custom-Select" v-model="type">
                  <option value="0">公告</option>
                  <option value="1">教程</option>
                  <option value="2">社群</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">
              <span>语言：</span>
            </label>
            <div class="col-sm-9">
              <div class="customSelect">
                <select class="form-control custom-Select" v-model="lang">
                  <option value="0">中文</option>
                  <option value="1">英文</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="button-list">
          <button type="button" class="btn btn-secondary" @click="addFn">提交</button>
          <button type="button" class="btn btn-default" @click="addstate = false">关闭</button>
        </div>
      </div>
    </div>
    <div class="bg" v-if="addstate"></div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'notice',
  data: function () {
    return {
      addstate: false,
      dataList: [],
      content: null,
      type: null,
      lang: null,
      editorOption: {}
    }
  },
  mounted () {
    let _this = this
    _this.initDataList()
  },
  methods: {
    initDataList: function () { // 加载数据
      let _this = this
      let obj = {
        type: 3
      }
      _this.$axios.post('/getnoticelist', obj).then(function (result) {
        let data = result.data || result
        if (result.code === 0) {
          _this.dataList = data;
        } else {
          alert(data.msg)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    addFn: function () {
      let _this = this
      let obj = {
        type: _this.type,
        lang: _this.lang,
        content: _this.content
      }
      _this.$axios.post('/editnotice', obj).then(function (result) {
        let data = result.data || result
        if (result.code === 0) {
          _this.addstate = false
          _this.initDataList()
          alert('添加成功')
        } else {
          alert(data.msg)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    delFn: function (id) {
      let _this = this
      let obj = {
        id: id
      }
      _this.$axios.post('/delnotice', obj).then(function (result) {
        let data = result.data || result
        if (result.code === 0) {
          _this.initDataList()
          alert('删除成功')
        } else {
          alert(data.msg)
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  @import "../../assets/css/bootstrap.css";
  @import "../../assets/css/main-admin.css";
  @import "../../assets/css/style-default.css";
  @import "../../assets/css/bootstrap.buttons.css";

  .labelList{
    width: 58%;
    /*margin: 0 auto;*/
  }
.button-list{
  width: 60%;
  margin: 0 auto;
}
.button-list button{
  width: 80px;
  margin: 40px 80px;
}
  .labelList label{
    line-height: 35px;
    font-size: 14px;
  }
.form-group{
  overflow: hidden;
}
  .table-bordered th{
    text-align: center;
  }
  .table-bordered{
    text-align: center;
  }
  .table-bordered td p{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .editDiv{
    width: 800px;
    height: 760px;
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
    border: 1px solid #cfcfcf;
    padding: 0;
    z-index: 999;
  }
  .bg{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    left: 0;
    top: 0;
  }
  .modal-tit{
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    background: #363b5b;
    color: #fff;
  }
  .editorBox{
    height: 490px;
    width: 98%;
    margin: 20px auto 0;
  }
  .quill-editor{
    height: 400px;
  }
  .main-container{
    position: relative;
    height: 100%;
    padding-bottom: 40px;
  }
  .wrapper{
    background: #F1F4F7 !important;
    height: 100%;
    overflow-y: scroll;
  }
</style>
