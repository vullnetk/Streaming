<template>
    <div>
      <h2>Add Movie</h2>
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
  import { createMovie, } from '../../api/movies';
  import { fetchGenres } from '@/api/genres';

  
  export default {
    name: 'addMovie',
    data() {
      return {
        newMovie: {
          title: '',
          year: null,
          description: '',
          coverImage: '',
          movieLink: '',
          isPg: false,
          genreId: null
        },
        genres: []
      };
    },
    created() {
      this.fetchGenres();
    },
    methods: {
      fetchGenres() {
        fetchGenres()
          .then(genres => {
            this.genres = genres;
          })
          .catch(error => {
            console.error('Failed to fetch genres:', error);
          });
      },
      addMovie() {
        createMovie(this.newMovie.title, this.newMovie.year, this.newMovie.description, this.newMovie.coverImage, this.newMovie.movieLink, this.newMovie.isPg, this.newMovie.genreId)
          .then(() => {
            console.log('Movie added successfully');
            // Reset the input fields after adding the movie
            this.newMovie = {
              title: '',
              year: null,
              description: '',
              coverImage: '',
              movieLink: '',
              isPg: false,
              genreId: null
            };
          })
        .catch(error => {
          console.error('Failed to add movie:', error);
      });
      }
    }
  };
  </script>
  