import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
      },
      {
        path: '/openaccount',
        name: 'Openaccount',
        component: () => import(/* webpackChunkName: "about" */ '../views/OpenAccount.vue')
      },
      {
        path: '/transfer',
        name: 'Transfer',
        component: () => import(/* webpackChunkName: "about" */ '../views/Transfer.vue')
      },
      {
        path: '/pwdsetting',
        name: 'PwdSetting',
        component: () => import(/* webpackChunkName: "about" */ '../views/PwdSetting.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
