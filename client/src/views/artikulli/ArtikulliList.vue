<template>
    <div class="books-list">
        <div class="d-flex justify-content-end mb-3">
      <router-link to="/addartikullis" class="btn btn-primary">Add new Artikulli</router-link>
    </div>
        <vue-good-table
            styleClass="vgt-table condensed"
            :columns="columns"
            :rows="allArtikujt"
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
                            <i class="fa-solid fa-ellipsis-vertical icon-red"></i>
                        </template>
                        <b-dropdown-item @click="editArtikulli(props.row)">Edit</b-dropdown-item>

                        <b-dropdown-item @click="toggleDeleteModal(props.row)">Delete</b-dropdown-item>
                        
                        
                        
                    </b-dropdown>
                </span>
            </template>
        </vue-good-table>
        <EditModal v-model="showModal" :showModal="showModal" :artikulli="artikulli" />

        <DeleteModal v-model="showDeleteModal" :itemName="artikulli.role" :itemId="artikulli.id" @deleteItem="deleteArtikulli"/>
        
        
       
    </div>
  </template>
  
  <script>
  import EditModal from './EditArtikulli.vue'

  import DeleteModal from '../../components/DeleteModal.vue'
  import {deleteArtikulli, fetchArtikulli} from  '../../api/artikulli';


export default {
    components: {
        EditModal,
        DeleteModal
    },
    data() {
        return {
            showModal: false,
            showDeleteModal: false,
            artikulliList: [],
            artikulli: {},
            columns: [
                {
                    label: 'Artikulli Name',
                    field: 'name',
                },
                {
                    label: 'Artikulli title',
                    field: 'title',
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
        this.fetchArtikulli()
    },
    computed: {
      allArtikujt() {
            return this.artikulliList
        }
    },
    methods: {
        editArtikulli(data) {
            console.log(data);
            this.showModal = true;
            this.artikulli = data
        },

        toggleDeleteModal(data) {
            console.log(data)
            this.showDeleteModal = true;
            this.artikulli = data;
        },

        async deleteArtikulli(id) {
            console.log(id)
            try{
                await deleteArtikulli(id)
            } catch (err) {
                console.log(err)
            } finally {
                await this.fetchArtikulli()
            }
        },
        async fetchArtikulli(){
            const response = await fetchArtikulli()
            console.log(response)
            this.artikulliList = response
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

 