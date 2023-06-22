import axios from 'axios';


export function fetchLlogari() {
    return axios.get(`api/llogari`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch llogari:', error);
            throw error;
        });
}

export function addLlogari(name) {
    return axios.post('/api/llogari/add', { name })
        .then(response => {
            console.log('Llogari added successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to add llogari:', error);
            throw error;
        });
}

export function editLlogari(id, name) {
    return axios.put(`/api/llogari/edit/${id}`, { name })
        .then(response => {
            console.log('Llogari edited successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to edit llogari:', error);
            throw error;
        });
}

export function deleteLlogari(id) {
    return axios.delete(`/api/llogari/delete/${id}`)
        .then(response => {
            console.log('Llogari deleted successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to delete llogari:', error);
            throw error;
        });
}