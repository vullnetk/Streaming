import axios from 'axios';

// const API_BASE_URL = '/api';

export function fetchGenres() {
  return axios.get(`api/genres`)
    .then(response => response.data)
    .catch(error => {
      console.error('Failed to fetch genres:', error);
      throw error;
    });
}

export function addGenre(name) {
    return axios.post('/api/genres/add', { name })
      .then(response => {
        console.log('Genre added successfully');
        return response.data;
      })
      .catch(error => {
        console.error('Failed to add genre:', error);
        throw error;
      });
  }

  export function editGenre(id, name) {
    return axios.put(`/api/genres/edit/${id}`, { name })
      .then(response => {
        console.log('Genre edited successfully');
        return response.data;
      })
      .catch(error => {
        console.error('Failed to edit genre:', error);
        throw error;
      });
  }

  export function deleteGenre(id) {
    return axios.delete(`/api/genres/delete/${id}`)
      .then(response => {
        console.log('Genre deleted successfully');
        return response.data;
      })
      .catch(error => {
        console.error('Failed to delete genre:', error);
        throw error;
      });
  }

