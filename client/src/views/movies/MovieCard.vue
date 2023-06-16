<template>
    <div class="mx-auto">
      <div class="row">
        <div class="col-md-12 text-center">
          <div class="search-container">
            <input type="text" v-model="searchQuery" @input="searchMovies" placeholder="Search movies...">
          </div>
        </div>
      </div>
      <div class="row">
        <div v-for="movie in filteredMovies" :key="movie.id" class="col-md-3">
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
        movies: [],
        searchQuery: '',
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
      },
      searchMovies() {
        // Perform filtering based on the search query
        const query = this.searchQuery.toLowerCase();
        this.filteredMovies = this.movies.filter(movie => movie.Title.toLowerCase().includes(query));
      },
    },
    computed: {
      filteredMovies() {
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          return this.movies.filter(movie => movie.Title.toLowerCase().includes(query));
        }
        return this.movies;
      },
    },
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
  
  .text-center {
    text-align: center;
  }
  
  .search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .search-container input {
    width: 300px; /* Adjust the width as desired */
    padding: 10px;
    font-size: 16px; /* Adjust the font size as desired */
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  </style>
  