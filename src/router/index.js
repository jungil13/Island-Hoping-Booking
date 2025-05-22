import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import 'aos/dist/aos.css';
import AOS from 'aos';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/book',
      name: 'book',
      component: () => import('../views/Booking.vue'),
      meta: { requiresAuth: true }, // Protected route
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: { requiresAuth: true }, // Protected route
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { guest: true }, // Guest-only route
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: { guest: true }, // Guest-only route
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, hideNavbar: true }, // Admin-only route
    },
  ],
});

router.beforeEach((to, from, next) => {
  AOS.init(); // Initialize AOS for animations

  const isAuthenticated = !!localStorage.getItem('token'); // Check for token in localStorage
  const user = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage
  const userType = user ? user.userType : null; // Extract userType

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    // Redirect to login if the route requires authentication and the user is not authenticated
    next({ name: 'login' });
  } else if (to.matched.some((record) => record.meta.guest) && isAuthenticated) {
    // Redirect to home if the route is guest-only and the user is authenticated
    next({ name: 'home' });
  } else if (to.matched.some((record) => record.meta.requiresAdmin) && userType !== 'admin') {
    // Redirect to home if the route requires admin and the user is not an admin
    next({ name: 'home' });
  } else {
    next(); // Proceed to the route
  }
});

export default router;
