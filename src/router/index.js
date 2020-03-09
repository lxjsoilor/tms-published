import Vue from 'vue'
import Router from 'vue-router'
import { PcCookie, gbs } from '../utils'
import { GetToken } from '@/api/ajax'

import login from '@/pages/user/login'
import register from '@/pages/user/register'
import logisticsList from '@/pages/logistics/list'
import logisticsDetails from '@/pages/logistics/details'
// 异常提报
import logisticsSubmission from '@/pages/logistics/submission'
// 订单提交
import logisticsSignFor from '@/pages/logistics/signFor'
// 操作说明
import illustrate from '@/pages/illustrate/index'
// 搜索
import logisticsSearch from '@/pages/logistics/search'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'base',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/logisticsList',
      name: 'logisticsList',
      component: logisticsList
    },
    {
      path: '/logisticsDetails',
      name: 'logisticsDetails',
      component: logisticsDetails
    },
    {
      path: '/logisticsSubmission',
      name: 'logisticsSubmission',
      component: logisticsSubmission
    },
    {
      path: '/logisticsSignFor',
      name: 'logisticsSignFor',
      component: logisticsSignFor
    },
    {
      path: '/illustrate',
      name: 'illustrate',
      component: illustrate
    },
    {
      path: '/logisticsSearch',
      name: 'logisticsSearch',
      component: logisticsSearch,
      meta: {
        keepAlive: true
      }
    }
  ]
})

// 判断是否登录1：是否有TOKEN 2：是否有FACTORY 3：是否有IS_LOGIN
function judgeIsLogin () {
  let TOKEN = PcCookie.get(gbs.USER.TOKEN)
  let LOGIN_NAME = PcCookie.get(gbs.USER.LOGIN_NAME)
  let PHONE = PcCookie.get(gbs.USER.PHONE)
  if (!!TOKEN && !!PHONE && !!LOGIN_NAME) {
    return true
  } else {
    return false
  }
}
// 路由守卫
router.beforeEach((to, from, next) => {
  next()
  // 判断是否登录状态，未登录直接跳转到登录页
  if (judgeIsLogin()) { // 已经登录
    if (to.name === 'login') {
      next('/logisticsList')
    } else {
      next()
    }
  } else { // 没有登录
    // 如果没有token获取token存入cookie
    if (!PcCookie.get(gbs.USER.TOKEN)) {
      GetToken({Phone: '1'}).then(result => {
        if (!!result && typeof result === 'string') {
          PcCookie.set({
            key: gbs.USER.TOKEN,
            value: result
          })
          if (to.name === 'illustrate') {
            next()
          } else if (to.name !== 'login' && to.name !== 'register') {
            next('/login')
          } else {
            next()
          }
        } else {
          alert('获取token失败，请退出重试！')
        }
      })
    } else {
      if (to.name === 'illustrate') {
        next()
      } else if (to.name !== 'login' && to.name !== 'register') {
        next('/login')
      } else {
        next()
      }
    }
  }
})

export default router
