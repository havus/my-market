import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
      children: [
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: ':id',
          component: () => import(/* webpackChunkName: "home" */ './views/Detail.vue'),
        }
      ]
    },
  ],
});
