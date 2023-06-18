<template>
    <div class="home-view">
    
        <GenreNav :genres="genres" />
        
        <div class="search-input">
		<input v-model="searchTerm" class="form-control form-control-lg form-control-borderless px-2" type="search" placeholder="Search...">
	    </div>

        <div class="category-products__page category-products m-auto">
            <div class="products-grid">
                <div v-for="movie in allMovies" :key="movie.id">
                    <!-- {{ movie}} -->
                  <router-link :to="{name: 'movieDetails', params: {id: movie.id}}" class="text-decoration-none"><MovieCard :movie="movie" /></router-link>
                </div>
            </div>
        </div>
    </div>    
    </template>
    
    <script>
    import { mapGetters } from 'vuex'
    import GenreNav from '@/components/GenreNav.vue'
    import MovieCard from '@/components/MovieCard.vue'
    import {filterMovies} from '@/api/movies'
    export default {
        components: {
            MovieCard,
            GenreNav
        },
        data() {
            return {
                allMovies: null,
                searchTerm: null,
                timeoutId: null
            }
        },	
//         computed: {
//     ...mapGetters(['fetchMovies']),
//   },
        async mounted() {
            await this.$store.dispatch('getMovies');
            await this.$store.dispatch('getGenres') 
            this.allMovies = this.$store.state.movies.movies.movies;
            // console.log(this.$store.state.movies)
        },
        computed: {
            genres() {
                return this.$store.state.genres.genres.genres
            }
        },
        watch: {
            'searchTerm': async function(){
                if(this.timeoutId){
                    clearTimeout(this.timeoutId)
                }
                this.timeoutId = setTimeout(() => {
                    this.searchMovies()
                    this.timeoutId = null
                }, 500)
            }
        },
        methods: {
            async searchMovies() {
            const response = await filterMovies(this.searchTerm)
            this.allMovies = response.data
        },
        }
        
        
    
    }
    </script>
    
    <style lang="scss" scoped>
    
    .home-view {
        height: 90%;
    }
    
    .category-products{
        width: 90%;
    }
    
    .products-grid{
        padding: 0 1%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 1%;
        margin-left: 5%;
        margin-bottom: 5%;
    }
    
    
    .shop-items{
        max-width: 75%;
        margin: 20px auto;
        padding:0px 20px;
    }
    
    .container-fluid {
        display: flex;
        gap: 4%;
    }
    
    .shop-items .item {
        position: relative;
        max-width: 230px;
        margin: 15px auto;
        padding: 5px;
        text-align: center;
        border-radius: 4px;
        overflow: hidden;
        border:2px solid #eee;
    }
    .shop-items .item:hover{	
        border:2px solid #32c8de;
    }
    .shop-items .item img {
        width: 100%;
        max-width: 360px;
        margin: 0 auto;
        border: 1px solid #eee;
        border-radius: 3px;
    }
    .shop-items .item  .item-dtls h4 {
        margin-top: 13px;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    .shop-items .item  .item-dtls .price {
        display: block;
        margin-bottom: 13px;
        font-size: 25px;
    }
    .shop-items .item  .ecom {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        padding-bottom:10px;
        padding-top: 10px;
        -webkit-transition: all 0.35s ease-in;
        -moz-transition: all 0.35s ease-in;
        -ms-transition: all 0.35s ease-in;
        -o-transition: all 0.35s ease-in;
        transition: all 0.35s ease-in;
    }
    
    .shop-items .item  .ecom  a.btn{
        border:1px solid #fff;
        color:#fff;
        background:transparent;
        -webkit-transition: all 0.35s ease-in;
        -moz-transition: all 0.35s ease-in;
        -ms-transition: all 0.35s ease-in;
        -o-transition: all 0.35s ease-in;
        transition: all 0.35s ease-in;
    }
    .shop-items .item  .ecom  a.btn:hover{
        background:#fff;
        color:#777;
    }    
    
    .category-tab {
        background: #eee;
        display: flex;
        align-items: center;
    }
    
    .category-link:hover {
        color: crimson !important;
        transition: 0.2s;
    }
    
    .category-link a.router-link-exact-active {
      color: crimson;
    }
    
    .search-input {
        width: 50%;
        margin: 3% auto 2% auto;
    }
    
    @media only screen and (max-width: 900px) {
        .container-fluid {
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 2%;
        }
    
        .search-input {
            width: 70%;
            margin: 5% auto 2% auto;
        }
    }
    
    @media only screen and (max-width: 820px) {
        .products-grid{
            margin-left: 15%;
        }
    }
    
    @media only screen and (max-width: 515px) {
        .products-grid{
            margin-left: 22%;
        }
    }
    </style>
    