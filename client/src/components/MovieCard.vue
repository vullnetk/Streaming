<template>
    <div>
    
      <div class="item">
    
            
    
            <div class="image-container">
                <img class="product-image" :src="!product.CoverImage?.includes('http') ? 'https://www.bootdey.com/image/200x200/5F9EA0/000000' : movie.CoverImage" alt="">
            </div>
    
            <div class="item-dtls">
    
            <h6 class="item-name">{{movie.Title}}</h6>
    
            
            </div>
        </div>
    </div>
    </template>
    
    <script>
    export default {
        props: {
            movie: {
                type: Object,
                required: true
            }
            
        },
        
    
    }
    </script>
    
    <style scoped>
    
    .badge{
        cursor: pointer;
    }
    
    
    .bg-lblue {
      background-color: #32c8de !important;
    }
    .bg-blue {
      background-color: #609cec !important;
    }
    
    /* Button classes */
    .btn {
        border-radius: 2px;
        position: relative;
    }
    
    
    .item {
        position: relative;
        max-width: 350px;
        margin: 15px auto;
        padding: 5px;
        text-align: center;
        border-radius: 4px;
        border:2px solid #eee;
    }
    
    .item:hover {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    
    .item img {
        width: 100%;
        max-width: 360px;
        margin: 0 auto 15px auto;
        border: 1px solid #eee;
        border-radius: 3px;
        height: 200px;
    }
    
    .item  .item-dtls h5 {
        margin-top: 13px;
        margin-bottom: 10px;
    }
    
    .item  .item-dtls .price {
        display: block;
        margin-bottom: 13px;
        font-size: 15px;
    }
    
    .item-name {
        text-decoration: none;
        color: #666666;
        padding-top: 10px;
        cursor: pointer;
    }
    
    .item {
        -webkit-transition: all 0.15s ease-in;
        -moz-transition: all 0.15s ease-in;
        -ms-transition: all 0.15s ease-in;
        -o-transition: all 0.15s ease-in;
        transition: all 0.15s ease-in;
    }
    .item a.btn:hover{
        background:#fff;
        color:#777;
    }     
    
    .img-responsive{
        object-fit: cover;
        width: fit-content;
    }
    
    .image-container{
        width: 210px;
    }
    
    .product-image {
        width: 100%;
    }
    
    </style>