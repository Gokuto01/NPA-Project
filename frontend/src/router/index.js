import { createRouter, createWebHistory } from 'vue-router';

import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Profile from '../views/Profile.vue';
import Home from '../views/Home.vue';
import MySheet from '../views/MySheet.vue';
import Detail from '../views/Detail.vue';
import AdminProfile from '../views/AdminProfile.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { requiresAuth: false },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/mySheet',
    name: 'mySheet',
    component: MySheet,
    meta: { requiresAuth: true },
  },
  {
    path: '/detail/:sheet_id',
    name: 'Detail',
    component: Detail,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile/admin',
    name: 'adminProfile',
    component: AdminProfile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check if user is authenticated
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('npaToken');

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    // User is not authenticated, redirect to login
    next({ name: 'Login' });
  } else {
    // User is authenticated or route doesn't require authentication
    next();
  }
});

export default router;