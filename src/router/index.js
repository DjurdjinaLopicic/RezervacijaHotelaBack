import Vue from 'vue'
import VueRouter from 'vue-router'
import Hoteli from '../views/Hoteli.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Grad from '../views/Grad.vue'
import Search from '../views/Search.vue'
import Hotel from '../views/Hotel.vue'
import Soba from '../views/Soba.vue'
import Profil from '../views/Profil.vue'
import IzmeniProfil from '../views/IzmeniProfil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Hoteli',
    component: Hoteli
  },  
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/userlogin',
    name: 'Login',
    component: Login
  },  
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },  
  {
    path: '/izmeniProfil',
    name: 'IzmeniProfil',
    component: IzmeniProfil
  },
  {
    path: '/grad/:id/:naziv',
    name: 'Grad',
    component: Grad
  },
  {
    path: '/hotel/:id/:naziv',
    name: 'Hotel',
    component: Hotel
  },
  {
    path: '/soba/:id',
    name: 'Soba',
    component: Soba
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
