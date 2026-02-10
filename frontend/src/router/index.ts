import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/processes',
    name: 'Processes',
    component: () => import('@/views/ProcessesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/processes/:id',
    name: 'ProcessDetail',
    component: () => import('@/views/ProcessDetailView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/exams',
    name: 'Exams',
    component: () => import('@/views/ExamsView.vue'),
    meta: { requiresAuth: true, roles: ['admin', 'recruiter'] }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guarda de navegação
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.meta.guestOnly && authStore.isAuthenticated) {
    next('/');
  } else if (to.meta.roles && !to.meta.roles.includes(authStore.user?.role)) {
    next('/');
  } else {
    next();
  }
});

export default router;