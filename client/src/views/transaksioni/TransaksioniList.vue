<template>
    <div class="books-list">
        <div class="d-flex justify-content-end mb-3">
      <router-link to="/addtransaksioni" class="btn btn-primary">Add new transaksion </router-link>
    </div>
        <vue-good-table
            styleClass="vgt-table condensed"
            :columns="columns"
            :rows="allTransaksion"
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
              <span v-if="props.column.field == 'llogari.name'">
                    {{ getLlogariName(props.row.llogariaId) }}
                   </span>
                <span v-if="props.column.field == 'moreOptions'" class="more-options__btn text-right">
                    <b-dropdown right no-caret variant="default">
                        <template #button-content>
                            <i class="fa-solid fa-ellipsis-vertical icon-black"></i>
                        </template>
                        <b-dropdown-item @click="editTransaksion(props.row)">Edit</b-dropdown-item>
  
                        <b-dropdown-item @click="toggleDeleteModal(props.row)">Delete</b-dropdown-item>
                        
                        
                        
                    </b-dropdown>
                </span>
            </template>
        </vue-good-table>
        <EditModal v-model="showModal" :showModal="showModal" :Transaksion="Transaksion" />
  
        <DeleteModal v-model="showDeleteModal" :itemName="Transaksion.name" :itemId="Transaksion.id" @deleteItem="deleteTransaksioni"/>
        
        
       
    </div>
  </template>
  
  <script>
  import EditModal from './EditTransaksion.vue'
  
  import {  deleteTransaksioni, fetchTransaksione } from '../../api/transaksioni';
  import DeleteModal from '../../components/DeleteModal.vue';
  import { fetchLlogari } from "../../api/llogari";
  
  
  export default {
    components: {
        EditModal,
        DeleteModal
    },
    data() {
        return {
            showModal: false,
            showDeleteModal: false,
            transaksionList: [],
            Transaksion: {},
            llogarite: [],
            llogari: "",
            columns: [
                {
                    label: 'Transaksion Name',
                    field: 'name',
                },
                {
                    label: 'Llogaria',
                    field: 'llogari.name',
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
        this.fetchTransaksione(),
        this.fetchLlogari()
    },
    computed: {
      allTransaksion() {
            return this.transaksionList
        },
        llogarite() {
        return this.llogarite
      },
      getLlogariName() {
        return (llogariaId) => {
          const llogari = this.llogarite.find((llogari) => llogari.id === llogariaId);
          return llogari ? llogari.name : 'Unknown';
        };
      },
    },
    methods: {
        editTransaksion(data) {
          console.log(data);
            this.showModal = true;
            this.Transaksion = data;
        },
  
        toggleDeleteModal(data) {
            console.log(data)
            this.showDeleteModal = true;
            this.Transaksion = data;
        },
  
        async deleteTransaksioni(id) {
            console.log(id)
            try{
                await deleteTransaksioni(id)
            } catch (err) {
                console.log(err)
            } finally {
                await this.fetchTransaksione()
            }
        },
        async fetchTransaksione(){
            const response = await fetchTransaksione()
            console.log(response)
            this.transaksionList = response
        },
        async fetchLlogari() {
          const response = await fetchLlogari()
          console.log(response)
          this.llogarite = response;
        }
  
    },
      
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
  
  