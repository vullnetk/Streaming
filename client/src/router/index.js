import { createRouter, createWebHashHistory } from 'vue-router'
// import UserProfile from '../views/UserProfile.vue'
import * as auth from '../helper/auth'
import store from '../store'


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

    {
        path: '/subs',
        name: 'subs',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "subs" */ '../views/subscriptions/SubsList.vue'),
        // meta: { requiresAuth: true }
    },

    {
        path: '/castCrewRoles',
        name: 'castCrewRoles',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "castCrewRoles" */ '../views/castCrewRoles/CastCrewRolesList.vue'),
        // meta: { requiresAuth: true }
    },
    {
        path: '/addcastCrewRoles',
        name: 'addCastCrewRoles',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "castCrewRolesInsert" */ '../views/castCrewRoles/AddCastCrewRole.vue'),
        // meta: { requiresAuth: true }
    },
    {
        path: '/castCrews',
        name: 'castCrews',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "castCrews" */ '../views/CastCrews/CastCrewsList.vue'),
        // meta: { requiresAuth: true }
    },
    {
        path: '/addcastCrew',
        name: 'addCastCrew',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import ( /* webpackChunkName: "castCrewsInsert" */ '../views/CastCrews/AddCastCrew.vue'),
        // meta: { requiresAuth: true }
    },       
    {
        path: '/register',
        name: 'register',
        component: () =>
          import ( /* webpackChunkName: "register" */ '../views/auth/Register.vue'),
        meta: { requiresAuth: false }
    },       
        
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/auth/Login.vue'),
        meta: { requiresAuth: false }
    },
    
    {
        path: '/movies',
        name: 'movies',
        component: () =>
          import ( /* webpackChunkName: "movies" */ '../views/movies/MoviesList.vue'),
        meta: { requiresAuth: false }
    },

    {
        path: '/addMovie',
        name: 'addMovie',
        component: () =>
          import ( /* webpackChunkName: "movies" */ '../views/movies/AddMovie.vue'),
        meta: { requiresAuth: false }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      
        const isAuthenticated = checkAuthentication();

        if (isAuthenticated) {
            store.commit('storeUser', auth.getUser());
            next();
        } else {
            next('/login');
        }
    } else {
      next();
    }
});

function checkAuthentication() {
    if(auth.userExists()) return true
    return false;
}

export default router;
// comment


