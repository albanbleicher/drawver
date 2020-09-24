import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Generate from '../views/Generate.vue'
import Result from '../views/Result.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/generate',
    name: 'Generate',
    component: Generate
  },
  {
    path: '/tadaaa',
    name: 'Result',
    component: Result
  },
  
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
