<template>
    <div class="books-list">
        <div class="d-flex justify-content-end mb-3">
      <router-link to="/addllogari" class="btn btn-primary">Add new llogari</router-link>
    </div>
        <vue-good-table
            styleClass="vgt-table condensed"
            :columns="columns"
            :rows="allLlogari"
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
                            <i class="fa-solid fa-ellipsis-vertical icon-black"></i>
                        </template>
                        <b-dropdown-item @click="editLlogari(props.row)">Edit</b-dropdown-item>

                        <b-dropdown-item @click="toggleDeleteModal(props.row)">Delete</b-dropdown-item>
                        
                        
                        
                    </b-dropdown>
                </span>
            </template>
        </vue-good-table>
        <EditModal v-model="showModal" :showModal="showModal" :llogari="llogari" />

        <DeleteModal v-model="showDeleteModal" :itemName="llogari.name" :itemId="llogari.id" @deleteItem="deleteLlogari"/>
        
        
       
    </div>
  </template>
  
  <script>
  import EditModal from './EditLlogari.vue'

  import {  deleteLlogari, fetchLlogari } from '../../api/llogari';
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
            llogariList: [],
            llogari: {},
            columns: [
                {
                    label: 'Llogari Name',
                    field: 'name',
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
        this.fetchLlogari()
    },
    computed: {
      allLlogari() {
            return this.llogariList
        }
    },
    methods: {
        editLlogari(name) {
            this.showModal = true;
            this.llogari = name
        },

        toggleDeleteModal(data) {
            console.log(data)
            this.showDeleteModal = true;
            this.llogari = data;
        },

        async deleteLlogari(id) {
            // console.log(id)
            try{
                await deleteLlogari(id)
            } catch (err) {
                console.log(err)
            } finally {
                await this.fetchLlogari()
            }
        },
        async fetchLlogari(){
            const response = await fetchLlogari()
            console.log(response)
            this.llogariList = response
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

 