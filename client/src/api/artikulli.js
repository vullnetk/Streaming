import axios from 'axios';

// const API_BASE_URL = '/api';

export function fetchArtikulli() {
    return axios.get(`api/artikulli`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch artikulli:', error);
            throw error;
        });
}

export function addArtikulli(name,title) {
    return axios.post('/api/artikulli/add', { name,title })
        .then(response => {
            console.log('artikulli added successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to add Artikulli:', error);
            throw error;
        });
}

export function editArtikulli(id, name,title) {
    console.log (name);
    console.log(title);
    const data = {
        name: name,
        title: title
       
      };
    return axios.put(`/api/artikulli/edit/${id}`, data)
        .then(response => {
            console.log('artikulli edited successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to edit artikulli:', error);
            throw error;
        });
}

export function deleteArtikulli(id) {
    return axios.delete(`/api/artikulli/delete/${id}`)
        .then(response => {
            console.log('Artikulli deleted successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to delete artikulli:', error);
            throw error;
        });
}