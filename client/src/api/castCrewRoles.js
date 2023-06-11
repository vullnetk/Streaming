import axios from 'axios';

// const API_BASE_URL = '/api';

export function fetchCastCrewRoles() {
    return axios.get(`api/castCrewRoles`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch cast Crew Roles:', error);
            throw error;
        });
}

export function addCastCrewRole(role) {
    return axios.post('/api/castCrewRoles/add', { role })
        .then(response => {
            console.log('cast Crew Role added successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to add cast Crew Roles:', error);
            throw error;
        });
}

export function editCastCrewRole(id, role) {
    return axios.put(`/api/castCrewRoles/edit/${id}`, { role })
        .then(response => {
            console.log('cast Crew Roles edited successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to edit cast Crew Role:', error);
            throw error;
        });
}

export function deleteCastCrewRole(id) {
    return axios.delete(`/api/castCrewRoles/delete/${id}`)
        .then(response => {
            console.log('cast Crew Role deleted successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to delete delete cast Crew Role:', error);
            throw error;
        });
}