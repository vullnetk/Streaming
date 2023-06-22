import axios from 'axios';

// const API_BASE_URL = '/api';

export function fetchLeagues() {
    return axios.get(`api/leagues`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch leagues:', error);
            throw error;
        });
}

export function getLeagueById(id) {
    return axios.get(`/api/leagues/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch leagues:', error);
            throw error;
        });
}


export function addLeague(name, country) {
    const LeagueData = {
        name: name,
        country: country
    };

    return axios.post('/api/leagues/add', LeagueData)
        .then(response => {
            console.log('League created successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to create league:', error);
            throw error;
        });
}



export function editLeague(id, name, country) {
    const leagueData = {
        name: name,
        country: country
    };

    return axios.put(`/api/leagues/edit/${id}`, leagueData)
        .then(response => {
            console.log('League updated successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to update league:', error);
            throw error;
        });
}

export function deleteLeague(id) {
    return axios.delete(`/api/leagues/delete/${id}`)
        .then(response => {
            console.log('league deleted successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to delete league:', error);
            throw error;
        });
}