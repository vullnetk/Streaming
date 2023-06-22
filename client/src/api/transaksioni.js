import axios from 'axios';

export function fetchTransaksione() {
    return axios.get(`api/transaksione`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch transaksioni:', error);
            throw error;
        });
}

export function addTransaksioni(name, llogariaId) {
    return axios.post('/api/transaksioni/add', { name, llogariaId })
        .then(response => {
            console.log('transaksioni added successfully');
            return response.data;
        })  
        .catch(error => {
            console.error('Failed to add transaksioni:', error);
            throw error;
        });
}

export function editTransaksioni(id, name, llogariaId) {
    const data = {
        name: name,
        llogariaId: llogariaId
       
      };
    
    return axios.put(`/api/transaksioni/edit/${id}`, data)
        .then(response => {
            console.log('transaksioni edited successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to edit transaksioni:', error);
            throw error;
        });
}

export function deleteTransaksioni(id) {
    return axios.delete(`/api/transaksioni/delete/${id}`)
        .then(response => {
            console.log('transaksioni deleted successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to delete transaksioni:', error);
            throw error;
        });
}