import Vue from 'vue'
import axios from 'axios'
// import httpConfig from '../config/http'
import store from '../vuex/store'
import router from '../router'

let axiosRequset = axios.create({
  // baseURL: process.env.BASE_API // api的base_url
  baseURL: 'https://w1.fomo888.io/app' // api的base_url
})

let newAxiosRequset = axios.create({
  baseURL: 'https://w1.fomo888.io'
})

// axiosRequset.interceptors.request.use((config) => {
  // config.headers['Access-Control-Allow-Origin'] = '*'
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // config.data = qs.stringify(config.data)
  // return config
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

newAxiosRequset.interceptors.response.use((result) => {
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
Vue.prototype.$newAxios = newAxiosRequset

export default {axiosRequset, newAxiosRequset}
