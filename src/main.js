// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import './assets/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)

const Realtime = require('./components/Realtime.vue')
const History = require('./components/History.vue')
const Login = require('./components/Login.vue')
const SystemCenter = require('./components/SystemCenter.vue')
const DeviceCenter = require('./components/DeviceCenter.vue')
const UserCenter = require('./components/UserCenter.vue')
const Main = require('./components/Main.vue')
const DeviceSceneConfig = require('./components/DeviceSceneConfig.vue')
const DeviceChannelConfig = require('./components/DeviceChannelConfig.vue')
const SystemMainConfig = require('./components/SystemMainConfig.vue')
const SystemIconConfig = require('./components/SystemIconConfig.vue')

const routes = [
  { path: '/', component: Login, meta: { requiresAuth: false } },
  { path: '/login', component: Login, meta: { requiresAuth: false } },
  { path: '/main',
    component: Main,
    children: [
      { path: '', component: Realtime, meta: { requiresAuth: true } },
      { path: 'realtime', component: Realtime, meta: { requiresAuth: true } },
      { path: 'realtime/:sceneid', component: Realtime, meta: { requiresAuth: true } },
      { path: 'history', component: History, meta: { requiresAuth: true } },
      { path: 'history/:sceneid', component: History, meta: { requiresAuth: true } },
      { path: 'userCenter', component: UserCenter, meta: { requiresAuth: true } },
      { path: 'systemCenter',
        component: SystemCenter,
        children: [
          { path: '', component: SystemMainConfig, meta: { requiresAuth: true } },
          { path: 'systemMainConfig', component: SystemMainConfig, meta: { requiresAuth: true } },
          { path: 'systemIconConfig', component: SystemIconConfig, meta: { requiresAuth: true } }
        ]
      },
      { path: 'deviceCenter',
        component: DeviceCenter,
        children: [
          { path: '', component: DeviceSceneConfig, meta: { requiresAuth: true } },
          { path: 'deviceSceneConfig', component: DeviceSceneConfig, meta: { requiresAuth: true } },
          { path: 'deviceChannelConfig', component: DeviceChannelConfig, meta: { requiresAuth: true } }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const AuthService = new Vue({
  methods: {
    isLogin () {
      return true
    }
  }
})

router.beforeEach((to, from, next) => {
  console.log(to.meta.requiresAuth, AuthService.isLogin())
  if (to.meta.requiresAuth && !AuthService.isLogin()) {
    // next({
    //   path: '/login',
    //   query: { redirect: to.fullPath }
    // })
    next('/login')
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
