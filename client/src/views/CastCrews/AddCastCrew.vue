<template>
  <div class="form-container">
      <h2>Upload Cast Crew </h2>
      <div class="insert-form">
          <b-form @submit="onSubmit">
              <b-form-group
                  label="Cast Crew Name"
              >
                  <b-form-input
                      v-model="castCrew.fullName"
                      placeholder="Cast Crew name"
                      required
                      
                  ></b-form-input>
                  
              </b-form-group>
          </b-form>
      </div>
  </div>
</template>

<script>
import { addCastCrew } from '../../api/CastCrews'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; 
export default{
  name: 'AddCastCrew',
  data() {
      return {
          castCrew: {
              fullName: ''
          },
      
      }
  },
  
  methods: {
      async onSubmit() {
          
          try{
              await addCastCrew(this.castCrew.fullName)
              this.resetForm()
              toast("Upcoming product uploaded successfuly", {
                  autoClose: 1000,
              });
          } catch {
              toast("Upcoming product upload failed", {
                  autoClose: 1000,
              });
          }
      },

      resetForm() {
          this.castCrew.fullName = ""
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