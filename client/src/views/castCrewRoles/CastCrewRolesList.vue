<template>
    <div class="books-list">
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
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </template>
                        
                        
                    </b-dropdown>
                </span>
            </template>
        </vue-good-table>
        
        
       
    </div>
  </template>
  
  <script>
  
  import {   fetchCastCrewRoles } from '../../api/castCrewRoles';  //deleteCastCrewRole,



export default {
  
    data() {
        return {
            
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
        this.getRoles();
        // console.log(this.fetchCastCrewRole)
    },
     computed: {
      allRoles() {
            return this.rolesList,
            console.log(this.rolesList)
        }
        
    },
    methods: {
        

        

        // async deleteCastCrewRole(id) {
        //     console.log(id)
        //     try{
        //         await deleteCastCrewRole(id)
        //     } catch (err) {
        //         console.log(err)
        //     } finally {
        //         await this.fetchCastCrewRole()
        //     }
        // },
        async getRoles(){
            const response = await fetchCastCrewRoles()
            console.log(response)
            this.rolesList = response.data
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

 