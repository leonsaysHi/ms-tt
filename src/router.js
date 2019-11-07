import firebase from 'firebase'
import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main.vue'
import SignUp from '@/views/auth/Signup.vue'
import Login from '@/views/auth/Login.vue'
import Profile from '@/views/Profile.vue'


Vue.use(Router);

const router = new Router({
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
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/group',
      name: 'Home',
      component: Main,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/group/:group_id',
      name: 'GroupHome',
      component: Main,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next({ name: 'Login' });
  else if (!requiresAuth && !!currentUser && to.name !== 'Home') next({ name: 'Home' });
  else next();
});

export default router;
