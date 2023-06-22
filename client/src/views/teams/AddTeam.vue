<template>
    <div class="form-container">
      <h2 class="form-heading">Upload Team</h2>
      <form class="movie-form" @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="newTeam.title" placeholder="Enter movie title" />
        </div>
        <div class="form-group">
          <label for="text">City:</label>
          <textarea id="description" v-model="newTeam.city" placeholder="Enter movie description"></textarea>
        </div>
        <div class="form-group">
          <label for="leagueId">League:</label>
          <select id="genreId" v-model="newTeam.leagueId">
            <option v-for="league in leagues" :key="league.id" :value="league.id">{{ league.name }}</option>
          </select>
        </div>
        <button type="submit" class="submit-btn">Add team</button>
    </form>
    </div>
  </template>
    
    <script>
    import { createTeam } from '../../api/teams';
    import { fetchLeagues } from '../../api/leagues';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css'; 
  
    
    export default {
      name: 'addTeam',
      data() {
        return {
          newTeam: {
            title: '',
            city: '',
            leagueId: null
          },
          leagues: []
        };
      },
      created() {
        this.fetchLeagues();
      }, 
      methods: {
        fetchLeagues() {
        fetchLeagues()
          .then(response => {
            this.leagues = response;
          })
          .catch(error => {
            console.error('Failed to fetch genres:', error);
          });
        },
        async onSubmit() {
            try{
              await createTeam(this.newTeam.title, this.newTeam.city, this.newTeam.leagueId)
              this.resetForm()
              toast("Movie added successfuly", {
                autoClose: 1000,
              });
            }catch{
              toast("Adding Movie failed", {
                autoClose: 1000,
              });
            }
        },
  
        resetForm() {
          this.newTeam = {
            title: '',
            city: '',
            leagueId: null
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