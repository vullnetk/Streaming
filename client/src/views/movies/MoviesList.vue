<template>
  <div>
    <h2>Movies List</h2>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }}
        <button @click="editMovie(movie)">Edit</button>
        <button @click="deleteMovie(movie.id)">Delete</button>
      </li>
    </ul>
    <form @submit.prevent="addMovie">
      <input type="text" v-model="newMovie.title" placeholder="Enter movie title" />
      <input type="number" v-model="newMovie.year" placeholder="Enter movie year" />
      <input type="text" v-model="newMovie.description" placeholder="Enter movie description" />
      <input type="text" v-model="newMovie.coverImage" placeholder="Enter movie cover image URL" />
      <input type="text" v-model="newMovie.movieLink" placeholder="Enter movie link URL" />
      <label>
        <input type="checkbox" v-model="newMovie.isPg" />
        PG
      </label>
      <select v-model="newMovie.genreId">
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>
      <button type="submit">Add Movie</button>
    </form>
  </div>
</template>

<script>
import { fetchMovies, createMovie, updateMovie, deleteMovie } from '../../api/movies';
import { fetchGenres } from '@/api/genres';

export default {
  name: 'MoviesList',
  data() {
    return {
      movies: [],
      genres: [],
      newMovie: {
        title: '',
        year: null,
        description: '',
        coverImage: '',
        movieLink: '',
        isPg: false,
        genreId: null
      },
    };
  },
  mounted() {
    this.fetchMovies();
    this.fetchGenres();
  },
  methods: {
    fetchMovies() {
      fetchMovies()
        .then(response => {
          this.movies = response;
        })
        .catch(error => {
          console.error('Failed to fetch movies:', error);
        });
    },
    fetchGenres() {
      fetchGenres()
        .then(response => {
          this.genres = response;
        })
        .catch(error => {
          console.error('Failed to fetch genres:', error);
        });
    },
    addMovie() {
      createMovie(
        this.newMovie.title,
        this.newMovie.year,
        this.newMovie.description,
        this.newMovie.coverImage,
        this.newMovie.movieLink,
        this.newMovie.isPg,
        this.newMovie.genreId
      )
        .then(() => {
          console.log('Movie added successfully');
          this.resetNewMovie();
          this.fetchMovies();
        })
        .catch(error => {
          console.error('Failed to add movie:', error);
        });
    },
    editMovie(movie) {
      // Create a copy of the movie object to avoid modifying the original
      const editedMovie = Object.assign({}, movie);
      const newTitle = prompt('Enter new movie title:', editedMovie.title);
      if (newTitle !== null) {
        editedMovie.title = newTitle;
        updateMovie(editedMovie.id, editedMovie)
          .then(() => {
            console.log('Movie edited successfully');
            this.fetchMovies();
          })
          .catch(error => {
            console.error('Failed to edit movie:', error);
          });
      }
    },
    deleteMovie(id) {
      if (confirm('Are you sure you want to delete this movie?')) {
        deleteMovie(id)
          .then(() => {
            console.log('Movie deleted successfully');
            this.fetchMovies();
          })
          .catch(error => {
            console.error('Failed to delete movie:', error);
          });
      }
    },
    resetNewMovie() {
      this.newMovie = {
        title: '',
        year: null,
        description: '',
        coverImage: '',
        movieLink: '',
        isPg: false,
        genreId: null
      };
    },
  },
};
</script>
