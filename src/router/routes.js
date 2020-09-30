const routes = [
   {
      name: 'auth_callback',
      path: '/auth_callback',
      component: () => import('components/AuthCallback.vue'),
   },
   {
      path: '/public',
      component: () => import('layouts/PublicLayout.vue'),
      children: [
         {
            name: 'logout',
            path: '/logout',
            component: () => import('components/Logout.vue'),
         },
         {
            name: 'register',
            path: '/register',
            component: () => import('components/Register.vue'),
         },
      ],
   },
   {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
         {
            name: 'home',
            path: '',
            component: () => import('pages/Index.vue'),
         },
      ],
   },

   // Always leave this as last one,
   // but you can also remove it
   {
      path: '*',
      component: () => import('pages/Error404.vue'),
   },
]

export default routes
