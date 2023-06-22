<template>
    <div class="form-container">
      <h2 class="form-heading">Upload League</h2>
      <form class="movie-form" @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="title">Name:</label>
          <input type="text" id="title" v-model="newLeague.name" placeholder="Enter league title" />
        </div>
        <div class="form-group">
          <label for="title">Country:</label>
          <input type="text" id="title" v-model="newLeague.country" placeholder="Enter league country" />
        </div>
        
        <button type="submit" class="submit-btn">Add League</button>
      </form>
    </div>
  </template>
    
    <script>
    import { addLeague } from '../../api/leagues';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css'; 
  
    
    export default {
      name: 'AddLeague',
      data() {
        return {
          newLeague: {
            name: '',
            country: ''
          },
        
        };
      },
      
      methods: {
        async onSubmit() {
            try{
              await addLeague(this.newLeague.name, this.newLeague.country)
              this.resetForm()
              toast("League added successfuly", {
                autoClose: 1000,
              });
            }catch{
              toast("Adding league failed", {
                autoClose: 1000,
              });
            }
        },
  
        resetForm() {
          this.newLeague = {
            name: '',
            country: '',
            
          };
        },
      }
    };
    </script>
  
  <style lang="scss" scoped>
  .form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 3% 0;
  }
  
  .form-heading {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .movie-form {
    display: grid;
    grid-gap: 20px;
  }
  
  .form-group {
    display: grid;
    grid-template-columns: 120px 1fr;
    align-items: center;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="number"],
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  input[type="checkbox"] {
    margin-left: 8px;
  }
  
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .submit-btn {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
  
  </style>