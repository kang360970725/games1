import Vue from 'vue'
import axios from 'axios'
// import httpConfig from '../config/http'
import store from '../vuex/store'
import router from '../router'

let axiosRequset = axios.create({
  baseURL: 'http://localhost:3000'
  // baseURL: 'http://192.168.0.1:8080'
})

// axiosRequset.interceptors.request.use((config) => {
//   config.headers['Access-Control-Allow-Origin'] = '*'
//   config.data = qs.stringify(config.data)
//   return config
// })

axiosRequset.interceptors.response.use((result) => {
  switch (result.status) {
    case 200:
      break
    default:
      return Promise.resolve(result.data)
  }

  switch (result.data.code) {
    case -2:
      store.dispatch('setLogout')
      router.go(0)
      break
    default:
      return Promise.resolve(result.data)
  }
}, result => {
  return Promise.reject(result)
})

Vue.prototype.$axios = axiosRequset

export default ({})
