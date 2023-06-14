<template>
    <div class="form-container">
        <h2>Add to wishlist</h2>
        <div class="insert-form">
            <b-form @submit="onSubmit">
                <b-form-group
                    label="Movie Title"
                >
                    <b-form-input
                        v-model="wishlist.movieTitle"
                        placeholder="Movie Title"
                        required
                        
                    ></b-form-input>          
                </b-form-group>
                <b-form-group
                    label="Movie Year"
                >
                    <b-form-input
                        v-model="wishlist.movieYear"
                        placeholder="Movie Year"
                        required
                        type="number"
                    ></b-form-input>          
                </b-form-group>
                <b-form-group
                    label="Movie Country"
                >
                    <b-form-input
                        v-model="wishlist.movieCountry"
                        placeholder="Movie Country"
                        required
                        
                    ></b-form-input>          
                </b-form-group>
                <b-form-group
                    label="Genre"
                >
                    <b-form-input
                        v-model="wishlist.genre"
                        placeholder="Genre"
                        required
                        
                    ></b-form-input>          
                </b-form-group>
                <b-form-group
                    label="Description"
                >
                    <b-form-input
                        v-model="wishlist.description"
                        placeholder="Movie Description"
                        required
                        
                    ></b-form-input>          
                </b-form-group>
                <div class="d-flex gap-2 justify-content-center">
                    <b-button type="submit" variant="primary">Upload</b-button>

                    <b-button @click="resetForm" variant="danger">Reset</b-button>
                </div>
            </b-form>
        </div>
    </div>
  </template>
  
  <script>
  import { addToWishlist } from '../../api/wishlist'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  export default{
    name: 'AddCastCrewRole',
    data() {
        return {
            wishlist: {
                movieTitle: '',
                movieYear: '',
                movieCountry: '',
                genre: '',
                description:'',
            },
        
        }
    },
    
    methods: {
        async onSubmit() {
            
            try{
                await addToWishlist(this.wishlist.movieTitle, this.wishlist.movieYear, this.wishlist.movieCountry, this.wishlist.genre, this.wishlist.description, this.$store.state.authenticate.user.data.uid)
                this.resetForm()
                toast("Added to wishlist successfuly", {
                    autoClose: 1000,
                });
            } catch {
                toast("Adding to wishlist failed", {
                    autoClose: 1000,
                });
            }
        },
  
        resetForm() {
            this.wishlist.movieTitle = "";
            this.wishlist.movieYear = "";
            this.wishlist.movieCountry = "";
            this.wishlist.genre = "";
            this.wishlist.description = "";
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