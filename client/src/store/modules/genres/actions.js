import { fetchGenres } from '@/api/genres';

export const getGenres = ({ commit }) => {
  return new Promise((resolve, reject) => {
    fetchGenres()
      .then((response) => {
        const genresObject = { genres: response }; // Create an object with 'movies' property

        commit('storeGenres', genresObject); // Store the moviesObject in the Vuex store
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};