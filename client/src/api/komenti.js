import axios from 'axios';

// const API_BASE_URL = '/api';

export function fetchKomenti() {
    return axios.get(`api/komenti`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch komenti:', error);
            throw error;
        });
}

export function addKomenti(comment,title, artikulliID) {
    return axios.post('/api/komenti/add', { comment, title, artikulliID })
        .then(response => {
            console.log('komenti added successfully');
            return response.data;
        })  
        .catch(error => {
            console.error('Failed to add komenti:', error);
            throw error;
        });
}

export function editKomenti(id, comment, title, artikulliID) {
    console.log (comment);
    console.log (title);
    console.log(artikulliID);
    const data = {
        comment: comment,
        title: title,
        artikulliID: artikulliID
       
      };
    
    return axios.put(`/api/komenti/edit/${id}`, data)
        .then(response => {
            console.log('castCrew edited successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to edit castCrew:', error);
            throw error;
        });
}

export function deleteKomenti(id) {
    return axios.delete(`/api/komenti/delete/${id}`)
        .then(response => {
            console.log('Komenti deleted successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to delete Komenti:', error);
            throw error;
        });
}