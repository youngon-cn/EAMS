import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: {
      title: '教务管理系统'
    },
    component (resolve) {
      require(['views/index'], resolve)
    }
  },
  {
    path: '/login',
    meta: {
      title: '教务管理系统·登录'
    },
    component (resolve) {
      require(['views/login'], resolve)
    }
  },
  {
    path: '/user',
    meta: {
      title: '学籍信息'
    },
    component (resolve) {
      require(['views/user'], resolve)
    }
  },
  {
    path: '/password',
    meta: {
      title: '修改密码'
    },
    component (resolve) {
      require(['views/password'], resolve)
    }
  },
  {
    path: '/grade/pass',
    meta: {
      title: '及格成绩'
    },
    component (resolve) {
      require(['views/grade/pass'], resolve)
    }
  },
  {
    path: '/grade/fail',
    meta: {
      title: '不及格成绩'
    },
    component (resolve) {
      require(['views/grade/fail'], resolve)
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
