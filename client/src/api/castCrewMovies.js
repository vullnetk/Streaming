import axios from 'axios';

// Fetch all castCrewMovies
export function fetchCastCrewMovies() {
  return axios.get('/api/castCrewMovies')
    .then(response => response.data)
    .catch(error => {
      console.error('Failed to fetch castCrewMovies:', error);
      throw error;
    });
}

// Add a new castCrewMovie
export function addCastCrewMovie(castCrewId, movieId) {
  const castCrewMovieData = {
    castCrewId: castCrewId,
    movieId: movieId
  };

    console.log(castCrewId);
    console.log(movieId);
  return axios.post('/api/castCrewMovies/add', castCrewMovieData)
    .then(response => {
      console.log('CastCrewMovie added successfully');
      return response.data;
    })
    .catch(error => {
      console.error('Failed to add castCrewMovie:', error);
      throw error;
    });
}

// Edit a castCrewMovie
export function editCastCrewMovie(id, castCrewId, movieId) {
  const castCrewMovieData = {
    castCrewId: castCrewId,
    movieId: movieId
  };

  return axios.put(`/api/castCrewMovies/edit/${id}`, castCrewMovieData)
    .then(response => {
      console.log('CastCrewMovie edited successfully');
      return response.data;
    })
    .catch(error => {
      console.error('Failed to edit castCrewMovie:', error);
      throw error;
    });
}

// Delete a castCrewMovie
export function deleteCastCrewMovie(id) {
  return axios.delete(`/api/castCrewMovies/delete/${id}`)
    .then(response => {
      console.log('CastCrewMovie deleted successfully');
      return response.data;
    })
    .catch(error => {
      console.error('Failed to delete castCrewMovie:', error);
      throw error;
    });
}
