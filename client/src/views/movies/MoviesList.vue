<template>
  <div class="books-list">
      <div class="d-flex justify-content-end mb-3">
    <router-link to="/addMovie" class="btn btn-primary">Add new Movie</router-link>
  </div>
      <vue-good-table
          styleClass="vgt-table condensed"
          :columns="columns"
          :rows="movies" 
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
            <span v-if="props.column.field == 'isPg'">
                    {{props.row.isPg ? 'is Pg' : 'not Pg'}}
                </span>
                <span v-if="props.column.field == 'genre.name'">
                  {{ getGenreName(props.row.genreId) }}
                 </span>
              <span v-if="props.column.field == 'moreOptions'" class="more-options__btn text-right">
                  <b-dropdown right no-caret variant="default">
                      <template #button-content>
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                      </template>
                      <b-dropdown-item @click="updateMovie(props.row)">Edit</b-dropdown-item>

                      <b-dropdown-item @click="toggleDeleteModal(props.row)">Delete</b-dropdown-item>
                      
                  </b-dropdown>
              </span>
          </template>
      </vue-good-table>
      <EditModal v-model="showModal" :showModal="showModal" :newMovie="newMovie" />

      <DeleteModal v-model="showDeleteModal" :itemName="newMovie.Title" :itemId="newMovie.id" @deleteItem="deleteMovie"/>
      
     
  </div>
</template>

<script>
import { fetchMovies, deleteMovie } from '../../api/movies';
import { fetchGenres, getGenreById } from '@/api/genres';
import DeleteModal from '../../components/DeleteModal.vue'
import EditModal from './EditMovie.vue'


export default {
  components: {
    EditModal,
    DeleteModal
  },
  data() {
    return {
      showModal: false,
      showDeleteModal: false,
      movies: [],
      genres: [],
      genre: '',
      newMovie: {},
      columns: [
        { 
          label: 'Title',
          field: 'Title',
        },
        {
          label: 'Year',
          field: 'MovieYear'
        },
        {
          label: 'Description',
          field: 'Description'
        },
        {
          label: 'Cover image',
          field: 'CoverImage'
        },
        {
          label: 'Movie Link',
          field: 'MovieLink'
        },
        {
          label: 'IsPg',
          field: 'isPg'
        },
        {
          label: 'Genre',
          field: 'genre.name'
        },
        {
          label: 'Actions', 
          field: 'moreOptions',
        },
      ],
    };
  },
  mounted() {
    this.fetchMovies();
    this.fetchGenres();
  },
  computed: {
    movies() {
      return this.movies
    },
    genres() {
      return this.genres
    },
    getGenreName() {
      return (genreId) => {
        const genre = this.genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : 'Unknown';
      };
    },
  },
  methods: {
    updateMovie(movie){
      console.log(movie);
      this.showModal = true;
      this.newMovie = movie;
      console.log(this.newMovie);

    },
    toggleDeleteModal(data) {
      console.log(data)
      this.showDeleteModal = true;
      this.newMovie = data;
    },

    async deleteMovie(id) {
      console.log(id)
      try{
        await deleteMovie(id)
      }catch(err) {
        console.log(err)
      }finally {
        await this.fetchMovies()
      }
    },
    async fetchMovies() {
      const response = await fetchMovies()
          console.log(response)
          this.movies = response;
      },
      async fetchGenres() {
        const response = await fetchGenres()
        console.log(response)
        this.genres = response;
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
