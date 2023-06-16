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
        <div v-for="movie in displayedMovies" :key="movie.id" class="col-md-3">
          <div class="card mb-3">
            <img class="product-image" :src="!movie.CoverImage?.includes('http') ? 'https://www.bootdey.com/image/200x200/5F9EA0/000000' : movie.CoverImage" alt="">
            <div class="card-body">
              <h5 class="card-title">{{ movie.Title }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-container">
        <button class="pagination-button" @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <span class="pagination-current">Page {{ currentPage }} of {{ totalPages }}</span>
        <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
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
        currentPage: 1,
        pageSize: 8, // Number of movies per page
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
        const query = this.searchQuery.toLowerCase();
        this.currentPage = 1; // Reset to the first page when searching
        this.filteredMovies = this.movies.filter(movie => movie.Title.toLowerCase().includes(query));
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
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
      displayedMovies() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.filteredMovies.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.filteredMovies.length / this.pageSize);
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
  
  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .pagination-button {
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    cursor: pointer;
    margin: 0 5px;
  }
  
  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .pagination-current {
    margin: 0 10px;
  }
  </style>
  