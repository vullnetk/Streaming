import { createStore } from 'vuex'
import authIndex from './modules/auth/authIndex'
import moviesIndex from './modules/movies/moviesIndex'
import genresIndex from './modules/genres/genresIndex'

export default createStore({
    modules: {
        authenticate: authIndex,
        movies: moviesIndex,
        genres:genresIndex
    }
})