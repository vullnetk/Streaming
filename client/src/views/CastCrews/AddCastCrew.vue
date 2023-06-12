<template>
    <div>
      <h2>Add Cast Crew</h2>
      <input type="text" v-model="newCastCrew">
      <select v-model="selectedRole">
        <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.role }}</option>
      </select>
      <button @click="addCastCrew">Add</button>
    </div>
  </template>
  <script>
  import { addCastCrew  } from '../../api/castCrew';
  import { fetchCastCrewRoles  } from '../../api/castCrewRoles';
  export default {
    name: 'AddCastCrew',
    data() {
      return {
        newCastCrew: '',
        selectedRole: '',
        roles: [],
      };
    },
    mounted() {
      this.fetchCastCrewRoles();
    },
    methods: {
      fetchCastCrewRoles() {
        fetchCastCrewRoles()
          .then(roles => {
            this.roles = roles;
          })
          .catch(error => {
            console.error('Failed to fetch roles:', error);
          });
      },
      addCastCrew() {
        if(this.newCastCrew.trim() !== ''){
        addCastCrew(this.newCastCrew, this.selectedRole)
          .then(() => {
            console.log('CastCrew added successfully');
            this.newCastCrew = '';
            this.selectedRole = '';
          })
          .catch(error => {
            console.error('Failed to add CastCrew:', error);
          });
        }
      }
    }
  };
  </script>

  