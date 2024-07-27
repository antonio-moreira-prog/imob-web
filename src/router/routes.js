import Home from 'pages/HomePage.vue'
import LoginPage from 'pages/LoginPage.vue'
import PropertyPage from 'pages/PropertyPage.vue'
// import  CarouselSlide from  '../components/CarouselSlide.vue'
// import NewEditPropertyPage from 'pages/NewEditPropertyPage.vue'
// import ListMyPropertyPage from 'pages/ListMyPropertyPage.vue'
import Guard from '../Services/middleware.js'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/property/:id',
    name: 'PropertyPage',
    component: PropertyPage,
  },
  {
    path: '/carousel',
    name: 'CarouselSlide',
    component: () => import('../components/CarouselSlide.vue')
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', beforeEnter: Guard.auth, component: () => import('pages/DashboardPage.vue') },
      { path: '/edit/property', beforeEnter: Guard.auth, component: () => import('pages/NewEditPropertyPage.vue') },
      { path: '/edit/property/:id', beforeEnter: Guard.auth, component: () => import('pages/NewEditPropertyPage.vue') },
      { path: '/listmyproperty', beforeEnter: Guard.auth, component: () => import('pages/ListMyPropertyPage.vue') },
      { path: '/property/:id', beforeEnter: Guard.auth, component: () => import('pages/PropertyPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
