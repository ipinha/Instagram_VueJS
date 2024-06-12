import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Order from '../views/Order.vue'
import Cart from '@/views/Cart.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
    
  },
  {
    path: '/product/:_id',
    name: 'ProductDetail',
    component: ProductDetail,

  },
  {
    path:'/cart',
    name:'cart',
    component: Cart

  },
  {
    path:'/order',
    name:'order',
    component:Order

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
