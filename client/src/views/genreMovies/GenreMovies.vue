<template>
    <div class="category-products__page">
        <GenreNav :genres="genres" />
    
        <div class="category-products__page category-products">
            <!-- <div class="products-filter">
                <div class="search-input">
                    <input v-model="searchTerm" class="form-control form-control-lg form-control-borderless px-2" type="search" placeholder="Search...">
                </div>
                <FilterProducts @fetchData="fetchData" @fetchFilteredProducts="fetchFilteredProducts" />
            </div> -->
            <div class="products-grid">
                <div v-for="movie in genreMovies" :key="movie.id">
                    <router-link :to="{name: 'movieDetails', params: {id: movie.id}}" class="text-decoration-none"><MovieCard :movie="movie"/></router-link>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    // import FilterProducts from '../productCards/FilterProducts.vue'
    import MovieCard from '@/components/MovieCard.vue'
    // import {filterProductsWithBrand} from '@/eCommerce-sdk/products.js'
    import GenreNav from '../../components/GenreNav.vue'
    export default {
        components: {
            MovieCard,
            // FilterProducts,
            GenreNav
        },
        data() {
            return {
                genreMovies: null,
                genreId: null,
                // searchTerm: null,
                // timeoutId: null,
            }
        },
        watch: {
            '$route.params.id' : function(){
                this.fetchData()
            },
            // 'searchTerm': async function() {
            //     if(this.timeoutId){
            //         clearTimeout(this.timeoutId)
            //     }
            //     this.timeoutId = setTimeout(() => {
            //         this.searchProducts()
            //         this.timeoutId = null
            //     }, 500)
            // }
        },
        async mounted() {
            this.genreId = this.$route.params.id
            this.fetchData()
    
        },
        computed: {
            genres() {
                return this.$store.state.genres.genres.genres
            },
        },
        methods: {
            async fetchData() {
                this.genreId = this.$route.params.id
                await this.$store.dispatch('getMovies') 
                await this.$store.dispatch('getGenres')
                this.genreMovies = this.$store.state.movies.movies.movies.filter(movie => movie.genreId == this.genreId)
            },
            // async searchProducts() {
            //     this.categoryProducts = this.$store.state.products.products.filter(product => product.productCategory._id === this.categoryId)
            //     this.categoryProducts = this.categoryProducts.filter(product => product.productName.includes(this.searchTerm))
            //     console.log(this.categoryProducts)
            // },
            // async fetchFilteredProducts(selectedBrand) {
            //     try {
            //         const response = await filterProductsWithBrand(this.categoryId, selectedBrand)
            //         this.categoryProducts = response.data
            //     } catch (err) {
            //         console.log(err.response.data.message)
            //     }
            // }
        }
    }
    </script>
    
    <style lang="scss" scoped>
    
    .category-products__page{
        height: 100%;
    }
    
    .category-products{
        max-width: 90%;
        margin: 20px auto;
        padding:0px 20px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        padding: 2%;
    }
    
    .products-grid{
        width: 80%;
        padding: 0 1%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1%;
    }
    
    @media only screen and (max-width: 900px) {
        .category-products {
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 2%;
        }
    
        .products-grid{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 1%;
        }
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
        width: 90%;
        margin-top: 5%;
    }
    </style>