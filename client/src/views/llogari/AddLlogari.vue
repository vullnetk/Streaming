<template>
    <div class="form-container">
      <h2>Upload Llogari</h2>
      <div class="insert-form">
        <b-form @submit="onSubmit">
          
            <b-form-input v-model="llogari.name" placeholder="Llogari name" required></b-form-input>

            <div class="d-flex gap-2 justify-content-center">
                    <b-button type="submit" variant="primary">Upload</b-button>

                    <b-button @click="resetForm" variant="danger">Reset</b-button>
                </div>
        </b-form>
      </div>
    </div>
  </template>
  
  <script>
  import { addLlogari } from '../../api/llogari'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  export default {
    name: 'AddLlogari',
    data() {
      return {
        llogari: {
          name: ''
        },
      }
    },
    methods: {
      async onSubmit() {
        try {
          await addLlogari(this.llogari.name)
          this.resetForm()
          toast("Llogari uploaded successfully", { autoClose: 1000 });
          this.$router.push('/llogari');
        } catch {
          toast("Llogari upload failed", { autoClose: 1000 });
        }
      },
      resetForm() {
        this.llogari.name = ""
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
  