<template>
    <div>
      <h2>Add Genre</h2>
      <input type="text" v-model="newGenreName">
      <button @click="addGenre">Add</button>
    </div>
  </template>
  
  <script>
  import { addGenre } from '../../api/genres';
  
  export default {
    name: 'AddGenre',
    data() {
      return {
        newGenreName: ''
      };
    },
    methods: {
      addGenre() {
        addGenre(this.newGenreName)
          .then(() => {
            console.log('Genre added successfully');
            // Reset the input field after adding the genre
            this.newGenreName = '';
          })
          .catch(error => {
            console.error('Failed to add genre:', error);
          });
      }
    }
  };
  </script>
  