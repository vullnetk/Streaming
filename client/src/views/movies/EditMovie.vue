<template>
  <b-modal @ok="onSubmit" size="lg" ok-title="Save Changes">
    <template v-slot:header>
      <div class="d-flex justify-content-between w-100">
        <h4>Edit Movie</h4>
        <div class="d-flex flex-column text-secondary"></div>
      </div>
    </template>
    <div v-if="showModal" class="insert-form">
      <b-form>
        <b-form-input v-model="newMovie.Title" placeholder="Movie Title" required></b-form-input>
        <b-form-input v-model="newMovie.MovieYear" placeholder="Movie Year" required></b-form-input>
        <b-form-input v-model="newMovie.Description" placeholder="Movie Description" required></b-form-input>
        <b-form-input v-model="newMovie.CoverImage" placeholder="Movie Cover Image" required></b-form-input>
        <b-form-input v-model="newMovie.MovieLink" placeholder="Movie Link" required></b-form-input>
        <b-form-checkbox v-model="newMovie.isPg">PG</b-form-checkbox>
        <b-form-select v-model="newMovie.genreId" required>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
        </b-form-select>
        <b-form-select v-model="newMovie.castCrewId" required>
          <option v-for="castCrew in castCrews" :key="castCrew.id" :value="castCrew.id">{{ castCrew.fullName }}</option>
        </b-form-select>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
import { updateMovie } from '../../api/movies';
import { fetchGenres } from '@/api/genres';
import { fetchCastCrews } from '@/api/castCrew';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    newMovie: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      genres: [],
      castCrews: [],
    };
  },
  mounted() {
    this.fetchGenres();
    this.fetchCastCrews();
  },
  computed: {
    getGenreName() {
      return (genreId) => {
        const genre = this.genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : '';
      };
    },
    getcastCrewName() {
      return (castCrewId) => {
        const castCrew = this.castCrews.find((castCrew) => castCrew.id === castCrewId);
        return castCrew ? castCrew.fullName : '';
      };
    }

  },
  methods: {
    async onSubmit() {
      try {
        await updateMovie(
          this.newMovie.id,
          this.newMovie.Title,
          this.newMovie.MovieYear,
          this.newMovie.Description,
          this.newMovie.CoverImage,
          this.newMovie.MovieLink,
          this.newMovie.isPg,
          this.newMovie.genreId,
          this.newMovie.castCrewId
        );
        toast('Movie edited successfully', {
          autoClose: 1000,
        });
      } catch {
        toast('Movie edit failed', {
          autoClose: 1000,
        });
      }
    },
    async fetchGenres() {
      const response = await fetchGenres();
      console.log(response);
      this.genres = response;
    },
    async fetchCastCrews() {
      const response = await fetchCastCrews();
      console.log(response);
      this.castCrews = response;
    },
  },
};
</script>

<style>
</style>
