<template>
    <div class="books-list">
        <div class="d-flex justify-content-end mb-3">
      <router-link to="/addLeagues" class="btn btn-primary">Add new league</router-link>
    </div>
        <vue-good-table
            styleClass="vgt-table condensed"
            :columns="columns"
            :rows="allLeagues"
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
                
                <span v-if="props.column.field == 'moreOptions'" class="more-options__btn text-right">
                    <b-dropdown right no-caret variant="default">
                        <template #button-content>
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </template>
                        <b-dropdown-item @click="editLeague(props.row)">Edit</b-dropdown-item>
  
                        <b-dropdown-item @click="toggleDeleteModal(props.row)">Delete</b-dropdown-item>
                        
                        
                        
                    </b-dropdown>
                </span>
            </template>
        </vue-good-table>
        <EditModal v-model="showModal" :showModal="showModal" :newLeague="newLeague" />
  
        <DeleteModal v-model="showDeleteModal" :itemName="newLeague.name" :itemId="newLeague.id" @deleteItem="deleteLeague"/>
        
        
    </div>
  </template>
  
  <script>
  import EditModal from './EditLeague.vue'
  
  import {  deleteLeague, fetchLeagues } from '../../api/leagues';
  import DeleteModal from '../../components/DeleteModal.vue'
  
  
  export default {
    components: {
        EditModal,
        DeleteModal
    },
    data() {
        return {
            showModal: false,
            showDeleteModal: false,
            leaguesList: [],
            newLeague: {},
            columns: [
                {
                    label: 'League Name',
                    field: 'name',
                },
                {
                    label: 'League Country',
                    field: 'country',
                },
                {
                    label: '',
                    field: 'moreOptions',
                    width: '20px',
                },
            ],
        }
    },
    mounted() {
        this.fetchLeague()
    },
    computed: {
      allLeagues() {
            return this.leaguesList
        }
    },
    methods: {
        editLeague(league) {
            this.showModal = true;
            this.newLeague = league
        },
  
        toggleDeleteModal(data) {
            console.log(data)
            this.showDeleteModal = true;
            this.newLeague = data;
        },
  
        async deleteLeague(id) {
            console.log(id)
            try{
                await deleteLeague(id)
            } catch (err) {
                console.log(err)
            } finally {
                await this.fetchLeague()
            }
        },
        async fetchLeague(){
            const response = await fetchLeagues()
            console.log(response)
            this.leaguesList = response
        }
  
    }
  }
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
  
  