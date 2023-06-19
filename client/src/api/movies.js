import axios from 'axios';


// Fetch all movies
export function fetchMovies() {
    return axios.get('/api/movies')
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch movies:', error);
            throw error;
        });
}

// export function filterMovies(searchTerm) {
//     return axios.get(`${API_URL}/api/filterMovie?searchTerm=${searchTerm}`)
// }
export function filterMovies(searchTerm) {
    console.log(searchTerm)
    return axios.get(`/api/filterMovie?searchTerm=${searchTerm}`)

}

// Get a single movie by ID
export function getMovieById(id) {
    return axios.get(`/api/movies/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch movie:', error);
            throw error;
        });
}

// Create a new movie
export function createMovie(title, year, description, coverImage, movieLink, isPg, genreId) {
    const movieData = {
        Title: title,
        MovieYear: year,
        Description: description,
        CoverImage: coverImage,
        MovieLink: movieLink,
        isPg: isPg,
        genreId: genreId
    };

    return axios.post('/api/createmovie', movieData)
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
export function updateMovie(id, Title, MovieYear, Description, CoverImage, MovieLink, isPg, genreId) {
    const movieData = {
        Title: Title,
        MovieYear: MovieYear,
        Description: Description,
        CoverImage: CoverImage,
        MovieLink: MovieLink,
        isPg: isPg,
        genreId: genreId
    };

    return axios.put(`/api/updatemovie/${id}`, movieData)
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
export function deleteMovie(id) {
    console.log(id)
    return axios.delete(`/api/movie/delete/${id}`)
        .then(response => {
            console.log('Movie deleted successfully');
            return response.data;
        })
        .catch(error => {
            console.error('Failed to delete movie:', error);
            throw error;
        });
}