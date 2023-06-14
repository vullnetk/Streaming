<template>
    <b-modal @ok="onSubmit" size="lg" ok-title="Save Changes">
      <template v-slot:header>
        <div class="d-flex justify-content-between w-100">
          <h4>Edit Movie</h4>
          <div class="d-flex flex-column text-secondary"></div>
        </div>
      </template>
      <div v-if="showModal" class="insert-form">
        <b-form>
          <b-form-input v-model="newMovie.Title" placeholder="Movie Title" required></b-form-input>
          <b-form-input v-model="newMovie.MovieYear" placeholder="Movie Year" required></b-form-input>
          <b-form-input v-model="newMovie.Description" placeholder="Movie Description" required></b-form-input>
          <b-form-input v-model="newMovie.CoverImage" placeholder="Movie Cover Image" required></b-form-input>
          <b-form-input v-model="newMovie.MovieLink" placeholder="Movie Link" required></b-form-input>
          <b-form-checkbox v-model="newMovie.isPg">PG</b-form-checkbox>
          <b-form-select v-model="newMovie.genreId" required>
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
          </b-form-select>
        </b-form>
      </div>
    </b-modal>
  </template>
  
  
  <script>
  import { updateMovie } from '../../api/movies'
  import { fetchGenres } from '@/api/genres';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  export default {

    data() {
      return {
        genres: [],
        genre: ''
      }
    },
    mounted() {
    this.fetchGenres();
  },
  computed: {
    genres() {
      return this.genres
    },
    getGenreName() {
      return (genreId) => {
        const genre = this.genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : '';
      };
    },
  },
      props: {
          showModal: {
              type: Boolean,
              default: false,
          },
          newMovie: {
              type: Object,
              default: null,
          }
      },
      methods: {
          async onSubmit() {
              try {  
                await updateMovie(this.newMovie.id, this.newMovie.Title, this.newMovie.MovieYear, this.newMovie.Description, this.newMovie.CoverImage, this.newMovie.MovieLink, this.newMovie.isPg, this.newMovie.genreId)
                  toast("Movie edited successfuly", {
                      autoClose: 1000,
                  });
              } catch {
                  toast("Movie edit failed", {
                      autoClose: 1000,
                  });
              }
          },
          async fetchGenres() {
            const response = await fetchGenres()
            console.log(response)
            this.genres = response;
          }

      }
  }
  </script>
  
  <style>
  
  </style>