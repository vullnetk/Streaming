import axios from 'axios';


// Fetch all movies
export function fetchTeams() {
    return axios.get('/api/teams')
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch movies:', error);
            throw error;
        });
}


// Get a single movie by ID
export function getTeamById(id) {
    return axios.get(`/api/teams/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch movie:', error);
            throw error;
        });
}

// Create a new movie
export function createTeam(title, city, leagueId) {
    console.log("ewfwef");
    const teamData = {
        title: title,
        city: city,
        leagueId: leagueId
    };

    return axios.post('/api/createteam', teamData)
        .then(response => {
            console.log('Movie created successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to create movie:', error);
            throw error;
        });
}

// Update a movie
export function updateTeam(id, title, city, leagueId) {
    const teamData = {
        title: title,
        city: city,
        leagueId: leagueId
    };

    return axios.put(`/api/updateteam/${id}`, teamData)
        .then(response => {
            console.log('Movie updated successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to update movie:', error);
            throw error;
        });
}


// Delete a movie
export function deleteTeam(id) {
    console.log(id)
    return axios.delete(`/api/team/delete/${id}`)
        .then(response => {
            console.log('Movie deleted successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to delete movie:', error);
            throw error;
        });
}