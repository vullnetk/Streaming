<template>
    <div class="product-details">
        <div class="container mt-5" v-if="movie">
            <!-- product -->
            
            <div class="product-content product-wrap clearfix product-deatil">
                <div class="row gap-3 align-items-center">
                    <div class="col-md-5 col-sm-12 col-xs-12">
                        <div>
                            <iframe :src="movie.MovieLink" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
    
                    <div class="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                        <h2 class="name mt-5">
                            Movie Title: {{ movie.Title}}
                        </h2>
                
                        <hr />
                        <h3 class="price-container">
                            Year: {{ movie.MovieYear}}
                        </h3>
                        
                        <hr />
                        <div class="description">
                                <div class="description-title" style="display: flex;">
                                    <h6>Description</h6>
                                </div>
                                    <br />
                                    
                                    <p style="text-align: left;">
                                        {{ movie.Description }}
                                    </p>
                        </div>
                        <hr />
                        
                    </div>
                </div>
                <hr>   
            </div>
            <!-- end product -->
            
        </div>
    </div>
    </template>
    
    <script>
    
    import {getMovieById} from '@/api/movies'
    export default {
        name: 'MovieDetails',
        data() {
            return{
                
                movie : null,
                movieId : null
            }
        },
        async mounted() {
            this.movieId = this.$route.params.id
            console.log(this.movieId)
            this.movie = await getMovieById(this.movieId)
            // console.log(response)
            // this.movie = response.data
            // console.log(this.movie)
        }
    }
    </script>
    
    <style scoped>
    .product-details{
        padding-top: 1%;
        height: 100%;
    }
    .product-content {
        border: 1px solid #dfe5e9;
        margin-bottom: 20px;
        margin-top: 12px;
        background: #fff
    }
    
    .product-content .carousel-control.left {
        margin-left: 0
    }
    
    .product-content .product-image {
        background-color: #fff;
        display: block;
        min-height: 238px;
        overflow: hidden;
        position: relative
    }
    .image-item {
        max-width: 100%;
    }
    
    .product-content .product-deatil {
        border-bottom: 1px solid #dfe5e9;
        padding-bottom: 17px;
        padding-left: 16px;
        padding-top: 16px;
        position: relative;
        background: #fff
    }
    
    .product-content .product-deatil h5 a {
        color: #2f383d;
        font-size: 15px;
        line-height: 19px;
        text-decoration: none;
        padding-left: 0;
        margin-left: 0
    }
    
    .product-content .product-deatil h5 a span {
        color: #9aa7af;
        display: block;
        font-size: 13px
    }
    
    .product-content .product-deatil span.tag1 {
        border-radius: 50%;
        color: #fff;
        font-size: 15px;
        height: 50px;
        padding: 13px 0;
        position: absolute;
        right: 10px;
        text-align: center;
        top: 10px;
        width: 50px
    }
    
    .product-content .product-deatil span.sale {
        background-color: #21c2f8
    }
    
    .product-content .product-deatil span.discount {
        background-color: #71e134
    }
    
    .product-content .product-deatil span.hot {
        background-color: #fa9442
    }
    
    .product-content .description {
        font-size: 12.5px;
        line-height: 20px;
        padding: 10px 14px 16px 19px;
        background: #fff;
        display: flex;
        flex-direction: column;
    }
    
    .product-content .product-info {
        padding: 11px 19px 10px 20px
    }
    
    .product-content .product-info a.add-to-cart {
        color: #2f383d;
        font-size: 13px;
        padding-left: 16px
    }
    
    .product-content name.a {
        padding: 5px 10px;
        margin-left: 16px
    }
    
    
    .product-block .product-deatil p.price-container span,
    .product-content .product-deatil p.price-container span,
    .product-entry .product-deatil p.price-container span,
    .shipping table tbody tr td p.price-container span,
    .shopping-items table tbody tr td p.price-container span {
        color: #21c2f8;
        font-family: Lato, sans-serif;
        font-size: 24px;
        line-height: 20px
    }
    
    
    
    .product-wrap .product-image span.tag2 {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        padding: 10px 0;
        color: #fff;
        font-size: 11px;
        text-align: center
    }
    
    .product-wrap .product-image span.sale {
        background-color: #57889c
    }
    
    .product-wrap .product-image span.hot {
        background-color: #a90329
    }
    
    
    .description-tabs {
        padding: 30px 0 5px!important
    }
    
    .description-tabs .tab-content {
        padding: 10px 0
    }
    
    .product-deatil {
        padding: 30px 30px 50px
    }
    
    .product-deatil hr+.description-tabs {
        padding: 0 0 5px!important
    }
    
    .product-deatil .carousel-control.left,
    .product-deatil .carousel-control.right {
        background: none!important
    }
    
    .product-deatil .glyphicon {
        color: #3276b1
    }
    
    .product-deatil .product-image {
        border-right: none!important
    }
    
    .product-deatil .name {
        margin-top: 0;
        margin-bottom: 0
    }
    
    .product-deatil .name small {
        display: block
    }
    
    .product-deatil .name a {
        margin-left: 0
    }
    
    .product-deatil .price-container {
        font-size: 24px;
        margin: 0;
        font-weight: 300
    }
    
    .product-deatil .price-container small {
        font-size: 12px
    }
    
    .product-deatil .fa-2x {
        font-size: 16px!important
    }
    
    .product-deatil .fa-2x>h5 {
        font-size: 12px;
        margin: 0
    }
    
    .product-deatil .fa-2x+a,
    .product-deatil .fa-2x+a+a {
        font-size: 13px
    }
    
    .product-deatil .certified {
        margin-top: 10px
    }
    
    .product-deatil .certified ul {
        display: flex;
        justify-content: center;
        padding-left: 0
    }
    
    .product-deatil .certified ul li:not(first-child) {
        margin-left: -3px
    }
    
    .product-deatil .certified ul li {
        display: inline-block;
        background-color: #f9f9f9;
        border: 1px solid #ccc;
        padding: 13px 19px
    }
    
    .product-deatil .certified ul li:first-child {
        border-right: none
    }
    
    .product-deatil .certified ul li a {
        text-align: left;
        font-size: 12px;
        color: #6d7a83;
        line-height: 16px;
        text-decoration: none
    }
    
    .product-deatil .certified ul li a span {
        display: block;
        color: #21c2f8;
        font-size: 13px;
        font-weight: 700;
        text-align: center
    }
    
    .product-deatil .message-text {
        width: calc(100% - 70px)
    }
    
    @media only screen and (min-width:1024px) {
        .product-content div[class*=col-md-4] {
            padding-right: 0
        }
        .product-content div[class*=col-md-8] {
            padding: 0 13px 0 0
        }
        .product-wrap div[class*=col-md-5] {
            padding-right: 0
        }
        .product-wrap div[class*=col-md-7] {
            padding: 0 13px 0 0
        }
        .product-content .product-image {
            border-right: 1px solid #dfe5e9
        }
        .product-content .product-info {
            position: relative
        }
    }
    .review-container{
        width: 1150px;
        padding: 2%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    
    @media only screen and (max-width: 1000px){
        .review-container{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            gap: 5%;
        }
    
        .reviews-title{
            display: none;
        }
    
        .review-cards{
            margin-top: 5%;
        }
    }
    
    .review-form__container {
        width: 55%;
    }
    
    .products-grid {    
        width: 400px;
        text-align: -webkit-left;
        /* display: flex;
        flex-direction: column;
        align-items: flex-start; */
    }
    </style>