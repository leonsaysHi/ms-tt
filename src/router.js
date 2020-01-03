import firebase from 'firebase'
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Playlist from '@/views/Playlist.vue'
import SignUp from '@/views/auth/Signup.vue'
import Login from '@/views/auth/Login.vue'
import Profile from '@/views/Profile.vue'


Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: Playlist,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/playlist',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next({ name: 'login' })
  }
  else if (!requiresAuth && to.name !== 'playlist' && currentUser) {
    next({ name: 'home' })
  }
  else {
    next()
  }
})
router.onError( err => console.log('Router error:', err))

export default router;
