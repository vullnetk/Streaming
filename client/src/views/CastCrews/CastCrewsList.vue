<template>
    <div>
      <h2>CastCrew List</h2>
      <ul>
        <li v-for="castCrew in castCrews" :key="castCrew.id">
            {{ castCrew.fullName }}
            <button @click="editCastCrew(castCrew)">Edit</button>
          <button @click="deleteCastCrew(castCrew.id)">Delete</button>
        </li>
      </ul>
      <form @submit.prevent="addCastCrew">
        <input type="text" v-model="newCastCrew" placeholder="Enter castCrew " />
        <select v-model="selectedRole">
          <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.role }}</option>
        </select>
        <button type="submit">Add CastCrew</button>
      </form>
    </div>
  </template>
  
  <script>
  import { addCastCrew, deleteCastCrew, editCastCrew, fetchCastCrews } from '@/api/castCrew';
  import { fetchCastCrewRoles  } from '../../api/castCrewRoles';

  
  export default {
    name: 'CastCrewsList',
    data() {
      return {
        castCrews: [],
        newCastCrew: '',
        roles: '',
      };
    },
    mounted() {
      this.fetchCastCrews();
      this.fetchCastCrewRoles();
    },
    methods: {
      fetchCastCrews() {
        fetchCastCrews()
          .then(response => {
            this.castCrews = response;
          })
          .catch(error => {
            console.error('Failed to fetch castCrews:', error);
          });
      },
      fetchCastCrewRoles(){
        fetchCastCrewRoles()
        .then(response => {
          this.roles = response; 
        })
        .catch(error => {
            console.error('Failed to fetch castCrewRoles:', error);
        });
      },
      addCastCrew() {
        if (this.newCastCrew.trim() !== '' ) {
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
      },
      editCastCrew(castCrew) {
        const newcastCrewName = prompt('Enter new castCrew:', castCrew.fullName);
        if (newcastCrewName !== null ) {
          editCastCrew(castCrew.id, newcastCrewName, castCrew.roleId)
            .then(() => {
              console.log('CastCrew edited successfully');
              this.fetchCastCrews();
            })
            .catch(error => {
              console.error('Failed to edit castCrew:', error);
            });
        }
      },
      deleteCastCrew(id) {
        if (confirm('Are you sure you want to delete this castCrew?')) {
          deleteCastCrew(id)
            .then(() => {
              console.log('CastCrew deleted successfully');
              this.fetchCastCrews();
            })
            .catch(error => {
              console.error('Failed to delete castCrew:', error);
            });
        }
      },
    },
  };
  </script>
  

 