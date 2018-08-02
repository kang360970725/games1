// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios'
import util from '../utils/util'
import VueI18n from 'vue-i18n'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(VueQuillEditor)
// 注册i18n实例并引入语言文件，文件格式等下解析
const i18n = new VueI18n({
  locale: localStorage.lang || 'zh',
  messages: {
    'zh': require('./assets/languages/zh.json'),
    'en': require('./assets/languages/en.json')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  util,
  i18n,
  components: { App },
  template: '<App/>'
})
