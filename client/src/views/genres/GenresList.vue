<template>
  <div class="books-list">
      <div class="d-flex justify-content-end mb-3">
    <router-link to="/addGenres" class="btn btn-primary">Add new genre</router-link>
  </div>
      <vue-good-table
          styleClass="vgt-table condensed"
          :columns="columns"
          :rows="allGenres"
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
                      <b-dropdown-item @click="editGenre(props.row)">Edit</b-dropdown-item>

                      <b-dropdown-item @click="toggleDeleteModal(props.row)">Delete</b-dropdown-item>
                      
                      
                      
                  </b-dropdown>
              </span>
          </template>
      </vue-good-table>
      <EditModal v-model="showModal" :showModal="showModal" :Genre="Genre" />

      <DeleteModal v-model="showDeleteModal" :itemName="Genre.genre" :itemId="Genre.id" @deleteItem="deleteGenre"/>
      
      
  </div>
</template>

<script>
import EditModal from './EditGenre.vue'

import {  deleteGenre, fetchGenres } from '../../api/genres';
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
          genresList: [],
          Genre: {},
          columns: [
              {
                  label: 'Genre Name',
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
      this.fetchGenre()
  },
  computed: {
    allGenres() {
          return this.genresList
      }
  },
  methods: {
      editGenre(genre) {
          this.showModal = true;
          this.Genre = genre
      },

      toggleDeleteModal(data) {
          console.log(data)
          this.showDeleteModal = true;
          this.Genre = data;
      },

      async deleteGenre(id) {
          console.log(id)
          try{
              await deleteGenre(id)
          } catch (err) {
              console.log(err)
          } finally {
              await this.fetchGenre()
          }
      },
      async fetchGenre(){
          const response = await fetchGenres()
          console.log(response)
          this.genresList = response
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

