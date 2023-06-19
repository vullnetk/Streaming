<template>
    <div>
        <stripe-checkout ref="checkoutRef" mode="subscription" :pk="publishableKey" :line-items="lineItems"
            :success-url="successURL" :cancel-url="cancelURL" @loading="v => loading = v" />
        <h1>hey</h1>
        <div class="product">
            <div class="image-container">
                <img
                    src="https://images.ctfassets.net/4cd45et68cgf/5ZVnTR7jyrRs0lePAlVT71/0a7c103de12f7a4c0b6c3b6edd535298/Ads_Plan_Blog_Header_Image.png?w=2000" />
            </div>
            <div class="details-container">
                <h1>Basic subscription</h1>
                <p class="description">Basic subscription with 720p Max Qality</p>
                <p class="price">Price: 6.99</p>
                <button @click="submit">Buy Now</button>
            </div>
        </div>

    </div>
</template>
  
<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
    components: {
        StripeCheckout,
    },
    data() {
        this.publishableKey = 'pk_test_51NIWIWKQT0eVZi5g3oUq1bb7IUfptHis1J7M4c25EWuyahRAPzFBPFQ42xp0RByYD9zZyDQXVHZWMCaiGwB1KHLR00sBMIMBnT';
        return {
            loading: false,
            lineItems: [
                {
                    price: 'price_1NIWR1KQT0eVZi5glhZP9FYz', // The id of the recurring price you created in your Stripe dashboard
                    quantity: 1,
                },

            ],
            successURL: 'http://localhost:8080/#/successp',
            cancelURL: 'http://localhost:8080/#/errorp',
        };
    },
    methods: {
        submit() {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
        },
    },
};
</script>
<style scoped>
.product {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 40px;
    text-align: center;
    font-family: Arial, sans-serif;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
}

.image-container {
    margin-bottom: 20px;
}

img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

.description {
    margin-bottom: 20px;
}

.price {
    font-weight: bold;
    margin-bottom: 20px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #2980b9;
}
</style>