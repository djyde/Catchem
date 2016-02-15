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

  '/integrations': {
    name: 'integrations',
    component: require('./app/views/integrations.vue')
  }
})

router.start(app, '#app')
