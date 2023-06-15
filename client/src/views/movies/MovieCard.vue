<template>
    <div class="mx-auto">
      <div class="row">
        <div v-for="movie in movies" :key="movie.id" class="col-md-3">
          <div class="card mb-3">
            <img class="product-image" :src="!movie.CoverImage?.includes('http') ? 'https://www.bootdey.com/image/200x200/5F9EA0/000000' : movie.CoverImage" alt="">
            <div class="card-body">
              <h5 class="card-title">{{ movie.Title }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { fetchMovies } from '../../api/movies';
  
  export default {
    name: 'MovieList',
    data() {
      return {
        movies: []
      };
    },
    created() {
      this.fetchMoviesData();
    },
    methods: {
      fetchMoviesData() {
        fetchMovies()
          .then(response => {
            this.movies = response;
          })
          .catch(error => {
            console.error('Failed to fetch movies:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    width: 80%; /* Adjust the width as desired */
    margin: 0 auto; /* Center the cards horizontally */
  }
  
  .card-img-top {
    height: 200px; /* Adjust the height as desired */
    object-fit: cover;
  }
  
  .card-title {
    font-size: 16px;
    margin-top: 10px;
  }
  
  /* Add auto margins to the template */
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
  }
  </style>
  