import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import info from '@/view/info'
import help from '@/view/help'
import record from '@/view/record'
import admin from '@/view/admin/admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/info',
      name: 'info',
      component: info
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '/record',
      name: 'record',
      component: record
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  ]
})
