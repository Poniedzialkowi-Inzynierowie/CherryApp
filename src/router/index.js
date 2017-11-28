import Vue from 'vue'
import Router from 'vue-router'
import Clock from '@/components/Clock'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Clock',
      component: Clock
    }
  ]
})
