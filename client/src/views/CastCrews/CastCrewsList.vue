<template>
  <div class="books-list">
      <div class="d-flex justify-content-end mb-3">
    <router-link to="/addcastCrew" class="btn btn-primary">Add new cast crew </router-link>
  </div>
      <vue-good-table
          styleClass="vgt-table condensed"
          :columns="columns"
          :rows="allCastCrews"
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
            <span v-if="props.column.field == 'role.role'">
                  {{ getRoleName(props.row.roleId) }}
                 </span>
              <span v-if="props.column.field == 'moreOptions'" class="more-options__btn text-right">
                  <b-dropdown right no-caret variant="default">
                      <template #button-content>
                          <i class="fa-solid fa-ellipsis-vertical icon-black"></i>
                      </template>
                      <b-dropdown-item @click="editCastCrew(props.row)">Edit</b-dropdown-item>

                      <b-dropdown-item @click="toggleDeleteModal(props.row)">Delete</b-dropdown-item>
                      
                      
                      
                  </b-dropdown>
              </span>
          </template>
      </vue-good-table>
      <EditModal v-model="showModal" :showModal="showModal" :CastCrew="CastCrew" />

      <DeleteModal v-model="showDeleteModal" :itemName="CastCrew.fullName" :itemId="CastCrew.id" @deleteItem="deleteCastCrew"/>
      
      
     
  </div>
</template>

<script>
import EditModal from './EditCastCrew.vue'

import {  deleteCastCrew, fetchCastCrews } from '../../api/castCrew';
import DeleteModal from '../../components/DeleteModal.vue';
import { fetchCastCrewRoles } from "../../api/castCrewRoles";


export default {
  components: {
      EditModal,
      DeleteModal
  },
  data() {
      return {
          showModal: false,
          showDeleteModal: false,
          castcrewsList: [],
          CastCrew: {},
          roles: [],
          role: "",
          columns: [
              {
                  label: 'Cast Crew Name',
                  field: 'fullName',
              },
              {
                  label: 'Cast Crew Role',
                  field: 'role.role',
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
      this.fetchCastCrews(),
      this.fetchCastCrewRoles()
  },
  computed: {
    allCastCrews() {
          return this.castcrewsList
      },
      roles() {
      return this.roles
    },
    getRoleName() {
      return (roleId) => {
        const role = this.roles.find((role) => role.id === roleId);
        return role ? role.role : 'Unknown';
      };
    },
  },
  methods: {
      editCastCrew(data) {
        console.log(data);
          this.showModal = true;
          this.CastCrew = data;
      },

      toggleDeleteModal(data) {
          console.log(data)
          this.showDeleteModal = true;
          this.CastCrew = data;
      },

      async deleteCastCrew(id) {
          console.log(id)
          try{
              await deleteCastCrew(id)
          } catch (err) {
              console.log(err)
          } finally {
              await this.fetchCastCrews()
          }
      },
      async fetchCastCrews(){
          const response = await fetchCastCrews()
          console.log(response)
          this.castcrewsList = response
      },
      async fetchCastCrewRoles() {
        const response = await fetchCastCrewRoles()
        console.log(response)
        this.roles = response;
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

