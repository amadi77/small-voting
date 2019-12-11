import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7b242dcc = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _3d928b35 = () => interopDefault(import('../pages/file/index.vue' /* webpackChunkName: "pages/file/index" */))
const _04f45a6e = () => interopDefault(import('../pages/selection/index.vue' /* webpackChunkName: "pages/selection/index" */))
const _455982b7 = () => interopDefault(import('../pages/admin/_id/index.vue' /* webpackChunkName: "pages/admin/_id/index" */))
const _5d65be0c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _7b242dcc,
    name: "admin"
  }, {
    path: "/file",
    component: _3d928b35,
    name: "file"
  }, {
    path: "/selection",
    component: _04f45a6e,
    name: "selection"
  }, {
    path: "/admin/:id",
    component: _455982b7,
    name: "admin-id"
  }, {
    path: "/",
    component: _5d65be0c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
