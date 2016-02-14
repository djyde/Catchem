import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import app from './app/app.vue'

const router = new VueRouter()

router.map({
  '/': {
    name: 'apps',
    component: require('./app/views/index.vue')
  },

  '/services': {
    name: 'services',
    component: require('./app/views/services.vue')
  }
})

router.start(app, '#app')
