<template>
    <div>
      <h2>Cast crew role List</h2>
      <ul>
        <li v-for="castCrewRole in castCrewRoles" :key="castCrewRole.id">
          {{ castCrewRole.role }}
          <button @click="editCastCrewRole(castCrewRole)">Edit</button>
          <button @click="deleteCastCrewRole(castCrewRole.id)">Delete</button>
        </li>
      </ul>
      <form @submit.prevent="addCastCrewRole">
        <input type="text" v-model="newCastCrewRole" placeholder="Enter cast crew role " />
        <button type="submit">Add Cast crew role</button>
      </form>
    </div>
  </template>
  
  <script>
  import { addCastCrewRole, deleteCastCrewRole, editCastCrewRole, fetchCastCrewRoles } from '@/api/castCrewRoles';

  
  export default {
    name: 'CastCrewRolesList',
    data() {
      return {
        castCrewRoles: [],
        newCastCrewRole: '',
      };
    },
    mounted() {
      this.fetchCastCrewRoles();
    },
    methods: {
      fetchCastCrewRoles() {
        fetchCastCrewRoles()
          .then(response => {
            this.castCrewRoles = response;
          })
          .catch(error => {
            console.error('Failed to fetch cast crew roles:', error);
          });
      },
      addCastCrewRole() {
        if (this.newCastCrewRole.trim() !== '') {
          addCastCrewRole(this.newCastCrewRole)
            .then(() => {
              this.newCastCrewRole = '';
              this.fetchCastCrewRoles();
            })
            .catch(error => {
              console.error('Failed to add cast crew role:', error);
            });
        }
      },
      editCastCrewRole(castCrewRole) {
        const newRole = prompt('Enter new cast crew role:', castCrewRole.role);
        if (newRole !== null) {
          editCastCrewRole(castCrewRole.id, newRole)
            .then(() => {
              console.log('Cast Crew role edited successfully');
              this.fetchCastCrewRoles();
            })
            .catch(error => {
              console.error('Failed to edit cast crew role:', error);
            });
        }
      },
      deleteCastCrewRole(id) {
        if (confirm('Are you sure you want to delete this cast crew role?')) {
          deleteCastCrewRole(id)
            .then(() => {
              console.log('CastCrewRole deleted successfully');
              this.fetchCastCrewRoles();
            })
            .catch(error => {
              console.error('Failed to delete cast crew role:', error);
            });
        }
      },
    },
  };
  </script>
  