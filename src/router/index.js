import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import Home from '@/components/home'
import category from '@/components/category'
import adjustPrice from '@/components/adjustPrice'
import error from '@/components/error'
import recordsPrice from '@/components/records-price'
import recordsSettlement from '@/components/records-settlement'
import userCenter from '@/components/user-center'
import noToken from '@/components/no-token'

Vue.use(Router)

export default new Router({
  mode: 'history',
  history: true,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path: '/adjustPrice',
      name: 'adjustPrice',
      component: adjustPrice
    },

    {
      path: '/recordsPrice',
      name: 'recordsPrice',
      component: recordsPrice
    },
    {
      path: '/recordsSettlement',
      name: 'recordsSettlement',
      component: recordsSettlement
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter
    },
    {
      path: '/error',
      name: 'error',
      component: error
    },
    {
      path: '/noToken',
      name: 'noToken',
      component: noToken
    },

  ]
})
