import axios from 'axios';

// const API_BASE_URL = '/api';

export function fetchCastCrews() {
    return axios.get(`api/castCrews`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch castCrews:', error);
            throw error;
        });
}

export function addCastCrew(fullName, roleId) {
    return axios.post('/api/castCrew/add', { fullName, roleId })
        .then(response => {
            console.log('castCrew added successfully');
            return response.data;
        })  
        .catch(error => {
            console.error('Failed to add castCrews:', error);
            throw error;
        });
}

export function editCastCrew(id, fullName, roleId) {
    return axios.put(`/api/castCrew/edit/${id}`, { fullName, roleId })
        .then(response => {
            console.log('castCrew edited successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to edit castCrew:', error);
            throw error;
        });
}

export function deleteCastCrew(id) {
    return axios.delete(`/api/castCrews/delete/${id}`)
        .then(response => {
            console.log('castCrew deleted successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to delete castCrew:', error);
            throw error;
        });
}