<template>
  <div class="form-container">
      <h2>Upload Genre</h2>
      <div class="insert-form">
          <b-form @submit="onSubmit">
              <b-form-group
                  label="Genre Name"
              >
                  <b-form-input
                      v-model="Genre.genre"
                      placeholder="Genre name"
                      required
                      
                  ></b-form-input>
                  <div class="d-flex gap-2 justify-content-center">
                    <b-button type="submit" variant="primary">Upload</b-button>

                    <b-button @click="resetForm" variant="danger">Reset</b-button>
                </div>
                  
              </b-form-group>
          </b-form>
      </div>
  </div>
</template>

<script>
import { addGenre } from '../../api/genres'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; 
export default{
  name: 'AddGenre',
  data() {
      return {
          Genre: {
              genre: ''
          },
      
      }
  },
  
  methods: {
      async onSubmit() {
          
          try{
              await addGenre(this.Genre.genre)
              this.resetForm()
              toast("Genre uploaded successfuly", {
                  autoClose: 5000,
              });
              this.$router.push('/genres')
          } catch {
              toast("Genre upload failed", {
                  autoClose: 1000,
              });
          }
      },

      resetForm() {
          this.Genre.genre = ""
      }
  }
}
</script>

<style lang="scss" scoped>

.form-container {
  width: 600px;
  padding: 3% 0;
  margin: 0 auto;
}

</style>