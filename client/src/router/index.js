import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { auth: false, layout: 'auth' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { auth: false, layout: 'auth' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { auth: false, layout: 'auth' }
  },
  {
    path: '/users/edit',
    name: 'EditUser',
    component: () => import('../views/EditProfile.vue'),
    meta: { auth: true, layout: 'main' }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/Projects.vue'),
    meta: { auth: true, layout: 'main' }
  },
  {
    path: '/projects/new',
    name: 'NewProject',
    component: () => import('../views/Projects/NewProject.vue'),
    meta: { auth: true, layout: 'main' }
  },
  {
    path: '/projects/:id/edit',
    name: 'EditProject',
    component: () => import('../views/Projects/EditProject.vue'),
    meta: { auth: true, layout: 'main' }
  },
  {
    path: '/projects/:id',
    name: 'Project',
    component: () => import('../views/Projects/ProjectOverview.vue'),
    meta: { auth: true, layout: 'main' }
  },
  {
    path:  '*',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: { auth: false, layout: 'auth' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
