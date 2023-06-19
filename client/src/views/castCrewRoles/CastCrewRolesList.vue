<template>
    <div class="books-list">
        <div class="d-flex justify-content-end mb-3">
      <router-link to="/addcastCrewRoles" class="btn btn-primary">Add new cast crew role</router-link>
    </div>
        <vue-good-table
            styleClass="vgt-table condensed"
            :columns="columns"
            :rows="allRoles"
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
                        <b-dropdown-item @click="editCastCrewRole(props.row)">Edit</b-dropdown-item>

                        <b-dropdown-item @click="toggleDeleteModal(props.row)">Delete</b-dropdown-item>
                        
                        
                        
                    </b-dropdown>
                </span>
            </template>
        </vue-good-table>
        <EditModal v-model="showModal" :showModal="showModal" :castCrewRole="castCrewRole" />

        <DeleteModal v-model="showDeleteModal" :itemName="castCrewRole.role" :itemId="castCrewRole.id" @deleteItem="deleteCastCrewRole"/>
        
        
       
    </div>
  </template>
  
  <script>
  import EditModal from './EditCastCrewRole.vue'

  import {  deleteCastCrewRole, fetchCastCrewRoles } from '../../api/castCrewRoles';
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
            rolesList: [],
            castCrewRole: {},
            columns: [
                {
                    label: 'Role Name',
                    field: 'role',
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
        this.fetchCastCrewRole()
    },
    computed: {
      allRoles() {
            return this.rolesList
        }
    },
    methods: {
        editCastCrewRole(role) {
            this.showModal = true;
            this.castCrewRole = role
        },

        toggleDeleteModal(data) {
            console.log(data)
            this.showDeleteModal = true;
            this.castCrewRole = data;
        },

        async deleteCastCrewRole(id) {
            console.log(id)
            try{
                await deleteCastCrewRole(id)
            } catch (err) {
                console.log(err)
            } finally {
                await this.fetchCastCrewRole()
            }
        },
        async fetchCastCrewRole(){
            const response = await fetchCastCrewRoles()
            console.log(response)
            this.rolesList = response
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

 