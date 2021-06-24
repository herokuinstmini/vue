import Vue from 'vue'
import VueRouter from 'vue-router'
//import HelloWorld from '../components/HelloWorld.vue'

import Galery from '../components/Galery.vue'
import About from '../components/About.vue'
import Account from '../views/Account.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import UpdateAccount from '../components/UpdateAccount.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Galery',
    component: Galery
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/account',
    component: Account,
    children: [
      {
        path: 'register',
        component: Register,
      },
       {
         path: 'login',
         component: Login,
       },
       {
         path: '',
         component: UpdateAccount,
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