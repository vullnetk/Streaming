<template>
    <div class="form-container">
      <h2>Upload Artikulli</h2>
      <div class="insert-form">
        <b-form @submit="onSubmit">
          
            <b-form-input v-model="artikulli.name" placeholder="Artikulli name" required></b-form-input>
            <b-form-input v-model="artikulli.title" placeholder="artikulli title" required></b-form-input>
          
          <b-button type="submit" variant="primary" style="margin-top: 20px;">Submit</b-button>
        </b-form>
      </div>
    </div>
  </template>
  
  <script>
  import { addartikulli } from '../../api/artikulli'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  export default {
    name: 'Addartikulli',
    data() {
      return {
        artikulli: {
          name: '',
          title: ''
        },
      }
    },
    methods: {
      async onSubmit() {
        try {
          await addartikulli(this.artikulli.name, this.artikulli.title)
          this.resetForm()
          toast("Upcoming product uploaded successfully", { autoClose: 1000 });
          this.$router.push('/artikulli'); // Navigate to the artikulliList route
        } catch {
          toast("Upcoming product upload failed", { autoClose: 1000 });
        }
      },
      resetForm() {
        this.artikulli.name = "",
        this.artikulli.title = ""
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
  