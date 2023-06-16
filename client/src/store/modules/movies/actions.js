import { fetchMovies } from '@/api/movies';

export const getMovies = ({ commit }) => {
  return new Promise((resolve, reject) => {
    fetchMovies()
      .then((response) => {
        const moviesObject = { movies: response }; // Create an object with 'movies' property

        commit('storeMovies', moviesObject); // Store the moviesObject in the Vuex store
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};