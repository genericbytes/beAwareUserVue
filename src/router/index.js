import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Layout/User'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home')
      },
      {
        path: '/news/:id',
        name: '/news/:id',
        component: () => import('../components/News/singelNews.vue')
      },
      {
        path: '/category/:name/:id',
        name: 'category/:name/:id',
        component: () => import('../components/Categories/categoryNews.vue')
      },
      {
        path: '/signin',
        name: 'signin',
        component: () => import('../views/Layout/Account/SignIn.vue')
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('../views/Layout/Account/SignUp.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Layout/LoggedInUser'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/MyNews')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Profile/Profile')
      },
      {
        path: '/addNews',
        name: 'addNews',
        component: () => import('../views/News')
      },
      {
        path: '/reportNews/:id',
        name: 'reportNews',
        component: () => import('../views/ReportNews')
      },
      {
        path: '/reportedNews',
        name: 'reportedNews',
        component: () => import('../views/ReportedNews')
      },
      {
        path: '/requestCategory',
        name: 'requestCategory',
        component: () => import('../views/Categories')
      }
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  next()
});

export default router;
