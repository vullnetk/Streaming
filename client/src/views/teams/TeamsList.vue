<template>
    <div class="books-list">
        <div class="d-flex justify-content-end mb-3">
      <router-link to="/addTeam" class="btn btn-primary">Add new team</router-link>
    </div>
        <vue-good-table
            styleClass="vgt-table condensed"
            :columns="columns"
            :rows="teams" 
            theme="polar-bear"
            :sort-options="{
                enabled: false, 
            }"
            :search-options="{
                enabled: true,
                skipDiacritics: true, 
                placeholder: 'Search...',
            }"
            :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 7,
                position: 'bottom',
                perPageDropdown: [3, 7, 9],
                dropdownAllowAll: false,
                nextLabel: 'Next',
                prevLabel: 'Previous',
                rowsPerPageLabel: 'Rows per page',
            }"
            :line-numbers="true"
        >
            <template v-slot:table-row="props">
                  <span v-if="props.column.field == 'league.name'">
                    {{ getLeagueName(props.row.leagueId) }}
                   </span>
                <span v-if="props.column.field == 'moreOptions'" class="more-options__btn text-right">
                    <b-dropdown right no-caret variant="default">
                        <template #button-content>
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </template>
                        <b-dropdown-item @click="updateTeam(props.row)">Edit</b-dropdown-item>
  
                        <b-dropdown-item @click="toggleDeleteModal(props.row)">Delete</b-dropdown-item>
                        
                    </b-dropdown>
                </span>
            </template>
        </vue-good-table>
        <EditModal v-model="showModal" :showModal="showModal" :newTeam="newTeam" />
  
        <DeleteModal v-model="showDeleteModal" :itemName="newTeam.title" :itemId="newTeam.id" @deleteItem="deleteTeam"/>
        
       
    </div>
  </template>
  
  <script>
  import { fetchTeams, deleteTeam } from '../../api/teams';
  import { fetchLeagues, getLeagueById } from '../../api/leagues';
  import DeleteModal from '../../components/DeleteModal.vue'
  import EditModal from './EditTeam.vue'
  
  
  export default {
    components: {
      EditModal,
      DeleteModal
    },
    data() {
      return {
        showModal: false,
        showDeleteModal: false,
        teams: [],
        leagues: [],
        league: '',
        newTeam: {},
        columns: [
          { 
            label: 'title',
            field: 'title',
          },
          {
            label: 'city',
            field: 'city'
          },
          {
            label: 'League',
            field: 'league.name'
          },
          {
            label: 'Actions', 
            field: 'moreOptions',
          },
        ],
      };
    },
    mounted() {
      this.fetchTeams();
      this.fetchLeagues();
    },
    computed: {
      teams() {
        return this.teams
      },
      leagues() {
        return this.leagues
      },
      getLeagueName() {
        return (leagueId) => {
          const league = this.leagues.find((league) => league.id === leagueId);
          return league ? league.name : 'Unknown';
        };
      },
    },
    methods: {
      updateTeam(team){
        console.log(team);
        this.showModal = true;
        this.newTeam = team;
        console.log(this.newTeam);
  
      },
      toggleDeleteModal(data) {
        console.log(data)
        this.showDeleteModal = true;
        this.newTeam = data;
      },
  
      async deleteTeam(id) {
        console.log(id)
        try{
          await deleteTeam(id)
        }catch(err) {
          console.log(err)
        }finally {
          await this.fetchTeams()
        }
      },
      async fetchTeams() {
        const response = await fetchTeams()
            console.log(response)
            this.teams = response;
        },
        async fetchLeagues() {
          const response = await fetchLeagues()
          console.log(response)
          this.leagues = response;
        }
        
      }
  };
  </script>
  
  <style lang="scss" scoped>
  .books-list {
      width: 900px;
      padding:  3% 0;
      margin: auto;
  
      .image-cell {
          display: block;
          width: 40px;
          height: 40px;
          margin: auto;
      }
      .icon-red {
        color: red; // Specify the desired color here
      }
  
      .product-image{
          width: 100%;
      }
  
      .more-options__btn{
          .btn-group, .btn{
              background: transparent;
              border: none;
              outline: none;
  
              :focus {
                  border: none;
              }
  
          }
      }
  }
  
  </style>
  