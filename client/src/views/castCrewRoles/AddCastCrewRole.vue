<template>
    <div>
      <h2>Add Cast Crew Role</h2>
      <input type="text" v-model="newCastCrewRole">
      <button @click="addCastCrewRole">Add</button>
    </div>
  </template>
  
  <script>
  import { addCastCrewRole } from '../../api/castCrewRoles';
  
  export default {
    name: 'AddCastCrewRole',
    data() {
      return {
        newCastCrewRole: ''
      };
    },
    methods: {
      addCastCrewRole() {
        addCastCrewRole(this.newCastCrewRole)
          .then(() => {
            console.log('Cast Crew Role added successfully');
            // Reset the input field after adding the genre
            this.newGenreName = '';
          })
          .catch(error => {
            console.error('Failed to add Cast Crew Role:', error);
          });
      }
    }
  };
  </script>
  