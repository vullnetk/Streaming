import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [{
    path: '/genres',
        name: 'genres',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "genres" */ '../views/genres/GenresList.vue'),
        // meta: { requiresAuth: true }
},
{
    path: '/addGenres',
        name: 'addGenres',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "genres" */ '../views/genres/AddGenre.vue'),
        // meta: { requiresAuth: true }
},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    next();
});

export default router;