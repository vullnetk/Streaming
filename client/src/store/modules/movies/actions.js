import { fetchMovies } from '@/api/movies'

export const getMovies = ({ commit }) => {
    return new Promise((resolve, reject) => {
        fetchMovies()
            .then((response) => {
                console.log(response)
                commit('storeMovies', response.data)
                resolve(response)
            })
            .catch(error => { reject(error) })
    })
};