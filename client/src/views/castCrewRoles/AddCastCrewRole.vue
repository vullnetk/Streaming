<template>
    <div class="form-container">
      <h2>Upload Cast Crew Role</h2>
      <div class="insert-form">
        <b-form @submit="onSubmit">
          
            <b-form-input v-model="castCrewRole.role" placeholder="Role name" required></b-form-input>
          
          <b-button type="submit" variant="primary" style="margin-top: 20px;">Submit</b-button>
        </b-form>
      </div>
    </div>
  </template>
  
  <script>
  import { addCastCrewRole } from '../../api/castCrewRoles'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  export default {
    name: 'AddCastCrewRole',
    data() {
      return {
        castCrewRole: {
          role: ''
        },
      }
    },
    methods: {
      async onSubmit() {
        try {
          await addCastCrewRole(this.castCrewRole.role)
          this.resetForm()
          toast("Upcoming product uploaded successfully", { autoClose: 1000 });
          this.$router.push('/castCrewRoles'); // Navigate to the castCrewRoleList route
        } catch {
          toast("Upcoming product upload failed", { autoClose: 1000 });
        }
      },
      resetForm() {
        this.castCrewRole.role = ""
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .form-container {
    width: 600px;
    padding: 3% 0;
    margin: 0 auto;
  }
  </style>
  