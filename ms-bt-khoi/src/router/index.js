
import  {createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Emptable from '../views/MSEmployeePage.vue'
import About from '../views/About.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/employee-list',
    name: 'Emptable',
    component:Emptable
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path:'/:errorpage(.*)*',
    name:'Error',
    component:About
  }
]

const router = createRouter({
  history:createWebHashHistory(),
  routes,
  // linkExactActiveClass: "active",
})


export default router
