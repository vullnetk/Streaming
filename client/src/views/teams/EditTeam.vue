<template>
    <b-modal @ok="onSubmit" size="lg" ok-title="Save Changes">
      <template v-slot:header>
        <div class="d-flex justify-content-between w-100">
          <h4>Edit team</h4>
          <div class="d-flex flex-column text-secondary"></div>
        </div>
      </template>
      <div v-if="showModal" class="insert-form">
        <b-form>
          <b-form-input v-model="newTeam.title" placeholder="team Title" required></b-form-input>
          <b-form-input v-model="newTeam.city" placeholder="team city" required></b-form-input>
          <b-form-select v-model="newTeam.leagueId" required>
            <option v-for="league in leagues" :key="league.id" :value="league.id">{{ league.name }}</option>
          </b-form-select>
        </b-form>
      </div>
    </b-modal>
  </template>
  
  
  <script>
  import { updateTeam } from '../../api/teams'
  import { fetchLeagues } from '@/api/leagues';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  export default {

    data() {
      return {
        leagues: [],
        league: ''
      }
    },
    mounted() {
    this.fetchLeagues();
  },
  computed: {
    leagues() {
      return this.leagues
    },
    getLeagueName() {
      return (leagueId) => {
        const league = this.leagues.find((league) => league.id === leagueId);
        return league ? league.name : '';
      };
    },
  },
      props: {
          showModal: {
              type: Boolean,
              default: false,
          },
          newTeam: {
              type: Object,
              default: null,
          }
      },
      methods: {
          async onSubmit() {
              try {  
                await updateTeam(this.newTeam.id, this.newTeam.title, this.newTeam.city, this.newTeam.leagueId)
                  toast("Movie edited successfuly", {
                      autoClose: 1000,
                  });
              } catch {
                  toast("Movie edit failed", {
                      autoClose: 1000,
                  });
              }
          },
          async fetchLeagues() {
            const response = await fetchLeagues()
            console.log(response)
            this.leagues = response;
          }

      }
  }
  </script>
  
  <style>
  
  </style>