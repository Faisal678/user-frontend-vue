import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Home from '../components/Home.vue';
import Profile from '../components/Profile.vue';
import store from '../store/index';

const routes = [
   {
      path: '/',
      name: 'Register',
      component: Register
   },
   {
      path: '/login',
      name: 'Login',
      component: Login
   },
   {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
   },
   {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
   },
]

const router = createRouter({
   history: createWebHistory(),
   routes
})

router.beforeEach(async (to, from, next) => {
   const user = store.getters['auth/user'];

   if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!user) {
         next('/login');
      } else {
         next();
      }
   } else {
      next();
   }
});

export default router
