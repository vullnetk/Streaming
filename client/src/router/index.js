import { createRouter, createWebHashHistory } from 'vue-router'
// import UserProfile from '../views/UserProfile.vue'
import * as auth from '../helper/auth'
import store from '../store'
import UserProfile from '../views/UserProfile.vue'
import {getUser} from '../api/user'



const routes = [{
        path: '/welcome',
        name: 'welcome',
        component: () =>
            import ( /* webpackChunkName: "welcome" */ '../components/BeforeEnter'),
        meta: { requiresAuth: false }
    },
    {
        path: '/',
        name: 'home',
        component: () =>
            import ( /* webpackChunkName: "welcome" */ '../views/movieCards/MovieCards.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/genre/:id',
        name: 'genreMovies',
        component: () =>
            import ( /* webpackChunkName: "genreMovies" */ '../views/genreMovies/GenreMovies.vue'),
        meta: { requiresAuth: true }
    },  
    {
        path: '/movies/details/:id',
        name: 'movieDetails',
        component: () =>
            import ( /* webpackChunkName: "movieDetails" */ '../views/movies/MovieDetails.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/genres',
        name: 'genres',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "genres" */ '../views/genres/GenresList.vue'),
        meta: { requiresAuth: true, requireAdminRole: true }
    },
    {
        path: '/addRequest',
        name: 'request',
        component: () =>
            import ( /* webpackChunkName: "request" */ '../views/wishlist/AddToWishlist.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/addGenres',
        name: 'addGenres',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "genres" */ '../views/genres/AddGenre.vue'),
        meta: { requiresAuth: true, requireAdminRole: true }
    },

    {
        path: '/subs',
        name: 'subs',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "subs" */ '../views/subscriptions/SubsList.vue'),
        meta: { requiresAuth: true, requireAdminRole: true }
    },

    {
        path: '/payment',
        name: 'payment',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "payment" */ '../views/payment/Payment.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/subplans',
        name: 'subplans',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "subplans" */ '../views/payment/BasicPlan.vue'),
        meta: { requiresAuth: true }
    },

    {
        path: '/superplan',
        name: 'superplan',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "superplan" */ '../views/payment/SuperPlan.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/ultraplan',
        name: 'ultraplan',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "ultraplan" */ '../views/payment/UltraPlan.vue'),
        meta: { requiresAuth: true }
    },

    {
        path: '/successp',
        name: 'successp',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "successp" */ '../views/payment/SuccessView.vue'),
        meta: { requiresAuth: true ,requiresSub:true}
    },
    {
        path: '/errorp',
        name: 'errorp',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "errorp" */ '../views/payment/ErrorView.vue'),
        meta: { requiresAuth: true }
    },

    {
        path: '/castCrewRoles',
        name: 'castCrewRoles',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "castCrewRoles" */ '../views/castCrewRoles/CastCrewRolesList.vue'),
        meta: { requiresAuth: true, requireAdminRole: true }
    },
    {
        path: '/addcastCrewRoles',
        name: 'addCastCrewRoles',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "castCrewRolesInsert" */ '../views/castCrewRoles/AddCastCrewRole.vue'),
        meta: { requiresAuth: true, requireAdminRole: true }
    },
    {
        path: '/castCrews',
        name: 'castCrews',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "castCrews" */ '../views/CastCrews/CastCrewsList.vue'),
        meta: { requiresAuth: true, requireAdminRole: true }
    },


    {
        path: '/artikulli',
        name: 'artikulli',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "artikulli" */ '../views/artikulli/ArtikulliList.vue'),
        
    },

    {
        path: '/addArtikulli',
        name: 'addArtikulli',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "artikulli" */ '../views/artikulli/AddArtikulli.vue'),
        
    },
    {
        path: '/komenti',
        name: 'komenti',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "artikulli" */ '../views/komenti/KomentiList.vue'),
        
    },

    {
        path: '/addKomenti',
        name: 'addKomenti',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "artikulli" */ '../views/komenti/AddKomenti.vue'),
        
    },

    


    
    {
        path: '/addcastCrew',
        name: 'addCastCrew',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "castCrewsInsert" */ '../views/CastCrews/AddCastCrew.vue'),
        meta: { requiresAuth: true, requireAdminRole: true }
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
        path: '/profile',
        name: 'profile',
        component: UserProfile,
        meta: { requiresAuth: true }
    },
    {
        path: '/movies',
        name: 'movies',
        component: () =>
            import ( /* webpackChunkName: "movies" */ '../views/movies/MoviesList.vue'),
        meta: { requiresAuth: true, requireAdminRole: true  }
    },

    {
        path: '/addMovie',
        name: 'addMovie',
        component: () =>
            import ( /* webpackChunkName: "movies" */ '../views/movies/AddMovie.vue'),
        meta: { requiresAuth: true, requireAdminRole: true }
    },
    {
        path: '/editMovie',
        name: 'editMovie',
        component: () =>
            import ( /* webpackChunkName*: "movies" "/ */ '../views/movies/EditMovie.vue'),
        meta: { requiresAuth: true, requireAdminRole: true }
    },
    // {
    //     path: '/movieCard',
    //     name: 'movieCard',
    //     component: () =>
    //         import ( /* webpackChunkName*: "movies" "/ */ '../views/movies/MovieCard.vue'),
    //     meta: { requiresAuth: false }
    // },
    {
        path: '/movies/details/:id',
        name: 'movieDetails',
        component: () =>
            import ( /* webpackChunkName: "movieDetails" */ '../views/movies/MovieDetails.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/addWishlist',
        name: 'addWishlist',
        component: () =>
            import ( /* webpackChunkName: "addWishlist" */ '../views/wishlist/AddToWishlist.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/wishlist',
        name: 'wishlist',
        component: () =>
            import ( /* webpackChunkName: "wishlist" */ '../views/wishlist/WishlistListing.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: () =>
            import ( /* webpackChunkName: "unauthorized" */ '../views/auth/Authorized.vue'),
        meta: { requiresAuth: true }
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {

        const isAuthenticated = checkAuthentication();

        if (isAuthenticated) {
            const user = auth.getUser();
            store.commit('storeUser', user);

            if (to.matched.some(route => route.meta.requireAdminRole)) {
                const isAdminRole = await isAdmin(user)
                console.log('isAdminRole:', isAdminRole); 
                if (isAdminRole) {
                    console.log(isAdminRole)
                  next();
                } else {
                  // Redirect to unauthorized page or display an error message
                  next('/unauthorized');
                }
              } 
              else {
                  next();
              }
        } else {
            next('/welcome');
        }
    }else {
        next();
    }

    if (to.matched.some(route => route.meta.requiresSub)) {

        const isSubscribed = checkSubscription();

        if (checkSubscription) {
            next();
        } else {
            next('/payment');
        }
    } else {
        next();
    }
});

function checkAuthentication() {
    if (auth.userExists()) return true
    return false;
}
async function isAdmin(user) {
    const u = await getUser(user.uid)
    console.log(u)
    console.log(u.data.isAdmin)
    if(u.data.isAdmin) return true
    return false;
}

function checkSubscription() {
    const useri = auth.getUser();
    const subscription = useri.isSubscribed;
    if (subscription) return true
    return false;
}

export default router;
// comment