<template>
  <div class="form-container">
    <h2 class="form-heading">Upload Movie</h2>
    <form class="movie-form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="newMovie.title" placeholder="Enter movie title" />
      </div>
      <div class="form-group">
        <label for="year">Year:</label>
        <input type="number" id="year" v-model="newMovie.year" placeholder="Enter movie year" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="newMovie.description" placeholder="Enter movie description"></textarea>
      </div>
      <div class="form-group">
        <label for="coverImage">Cover Image URL:</label>
        <input type="text" id="coverImage" v-model="newMovie.coverImage" placeholder="Enter movie cover image URL" />
      </div>
      <div class="form-group">
        <label for="movieLink">Movie Link URL:</label>
        <input type="text" id="movieLink" v-model="newMovie.movieLink" placeholder="Enter movie link URL" />
      </div>
      <div class="form-group">
        <label for="isPg">PG:</label>
        <input type="checkbox" id="isPg" v-model="newMovie.isPg" />
      </div>
      <div class="form-group">
        <label for="genreId">Genre:</label>
        <select id="genreId" v-model="newMovie.genreId">
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
        </select>
      </div>
      <div class="form-group">
  <label for="castCrewIds">Cast and Crew:</label>
  <select multiple v-model="newMovie.castCrewIds">
    <option v-for="castCrew in castCrews" :key="castCrew.id" :value="castCrew.id">{{ castCrew.fullName }}</option>
  </select>
</div>
      <button type="submit" class="submit-btn">Add Movie</button>
    </form>
  </div>
</template>

<script>
import { createMovie } from '../../api/movies';
import { fetchGenres } from '@/api/genres';
import { fetchCastCrews } from '@/api/castCrew';
import { addCastCrewMovie } from '@/api/castCrewMovies';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'addMovie',
  data() {
    return {
      newMovie: {
        title: '',
        year: null,
        description: '',
        coverImage: '',
        movieLink: '',
        isPg: false,
        genreId: null,
        castCrewIds: [],
      },
      genres: [],
      castCrews: [],
    };
  },
  created() {
    this.fetchGenres();
    this.fetchCastCrews();
  },
  methods: {
    fetchGenres() {
      fetchGenres()
        .then(response => {
          this.genres = response;
        })
        .catch(error => {
          console.error('Failed to fetch genres:', error);
        });
    },
    fetchCastCrews() {
      fetchCastCrews()
        .then(response => {
          this.castCrews = response;
        })
        .catch(error => {
          console.error('Failed to fetch castCrews:', error);
        });
    },
    async onSubmit() {
      let movieResponse;
      try {
        // Create the movie and assign the response to movieResponse
        movieResponse = await createMovie(
          this.newMovie.title,
          this.newMovie.year,
          this.newMovie.description,
          this.newMovie.coverImage,
          this.newMovie.movieLink,
          this.newMovie.isPg,
          this.newMovie.genreId
        );

        // Create movie cast entries
        for (const castCrewId of this.newMovie.castCrewIds) {
          await addCastCrewMovie(castCrewId, movieResponse.id);
        }

        this.resetForm();
        toast('Movie added successfully', {
          autoClose: 100,
        });
      } catch {
        toast('Adding Movie failed', {
          autoClose: 1000,
        });
      }
    },
    resetForm() {
      this.newMovie = {
        title: '',
        year: null,
        description: '',
        coverImage: '',
        movieLink: '',
        isPg: false,
        genreId: null,
        castCrewIds: [],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 3% 0;
}

.form-heading {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.movie-form {
  display: grid;
  grid-gap: 20px;
}

.form-group {
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
}

label {
  font-weight: bold;
}

input[type='text'],
input[type='number'],
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type='checkbox'] {
  margin-left: 8px;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>