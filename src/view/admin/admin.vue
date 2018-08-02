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
          <img src="" style="width: 100px;height: auto;">
          <!--<span>Big Ben</span>-->
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
            <div class="panel panel-default">
              <div class="panel-heading">
                <div class="panel-body">
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th>版块</th>
                      <th>添加时间</th>
                      <th>内容</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>公告</td>
                      <td>2011/04/25</td>
                      <td>System Architect</td>
                      <td>
                        <a>修改</a>
                        <a>删除</a>
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
    </div>
    <div class="editDiv">
      <div class="modal-tit">修改公告</div>
      <div class="editorBox">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
        </quill-editor>
      </div>
    </div>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  export default {
    name: "notice",
    data () {
      return {
        content:null,
        editorOption:{}
      }
    },
    mounted() {
      let _this = this;
    },
    methods:{
      onEditorBlur(){//失去焦点事件
      },
      onEditorFocus(){//获得焦点事件
      },
      onEditorChange(){//内容改变事件
        let _this = this
        console.log(_this.content);
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/bootstrap.css";
  @import "../../assets/css/main-admin.css";
  @import "../../assets/css/style-default.css";

  .table-bordered th{
    text-align: center;
  }
  .table-bordered{
    text-align: center;
  }
  .editDiv{
    width: 800px;
    height: 600px;
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
    border: 1px solid #cfcfcf;
    padding: 0;
  }
  .modal-tit{
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    background: #363b5b;
    color: #fff;
  }
  .editorBox{
    height: 75%;
    width: 98%;
    margin: 20px auto 0;
  }
  .quill-editor{
    height: 100%;
  }
</style>
<style>
  #app{
    background: #F1F4F7 !important;
    height: 100%;
  }
</style>
