<template>
    <div>
      <h2>Genres List</h2>
      <ul>
        <li v-for="genre in genres" :key="genre.id">
          {{ genre.name }}
          <button @click="editGenre(genre)">Edit</button>
          <button @click="deleteGenre(genre.id)">Delete</button>
        </li>
      </ul>
      <form @submit.prevent="addGenre">
        <input type="text" v-model="newGenre" placeholder="Enter genre name" />
        <button type="submit">Add Genre</button>
      </form>
    </div>
  </template>
  
  <script>
  import { fetchGenres, addGenre, editGenre, deleteGenre } from '../../api/genres';
  
  export default {
    name: 'GenresList',
    data() {
      return {
        genres: [],
        newGenre: '',
      };
    },
    mounted() {
      this.fetchGenres();
    },
    methods: {
      fetchGenres() {
        fetchGenres()
          .then(response => {
            this.genres = response;
          })
          .catch(error => {
            console.error('Failed to fetch genres:', error);
          });
      },
      addGenre() {
        if (this.newGenre.trim() !== '') {
          addGenre(this.newGenre)
            .then(() => {
              this.newGenre = '';
              this.fetchGenres();
            })
            .catch(error => {
              console.error('Failed to add genre:', error);
            });
        }
      },
      editGenre(genre) {
        const newName = prompt('Enter new genre name:', genre.name);
        if (newName !== null) {
          editGenre(genre.id, newName)
            .then(() => {
              console.log('Genre edited successfully');
              this.fetchGenres();
            })
            .catch(error => {
              console.error('Failed to edit genre:', error);
            });
        }
      },
      deleteGenre(id) {
        if (confirm('Are you sure you want to delete this genre?')) {
          deleteGenre(id)
            .then(() => {
              console.log('Genre deleted successfully');
              this.fetchGenres();
            })
            .catch(error => {
              console.error('Failed to delete genre:', error);
            });
        }
      },
    },
  };
  </script>
  