<template>
    <div>
      <stripe-checkout
        ref="checkoutRef"
        mode="subscription"
        :pk="publishableKey"
        :line-items="lineItems"
        :success-url="successURL"
        :cancel-url="cancelURL"
        @loading="v => loading = v"
      />
      <button @click="submit">Subscribe!</button>
    </div>
  </template>
  
  <script>
  import { StripeCheckout } from '@vue-stripe/vue-stripe';
  export default {
    components: {
      StripeCheckout,
    },
    data () {
      this.publishableKey = 'pk_test_51NIWIWKQT0eVZi5g3oUq1bb7IUfptHis1J7M4c25EWuyahRAPzFBPFQ42xp0RByYD9zZyDQXVHZWMCaiGwB1KHLR00sBMIMBnT';
      return {
        loading: false,
        lineItems: [
          {
            price: 'price_1NIWR1KQT0eVZi5glhZP9FYz', // The id of the recurring price you created in your Stripe dashboard
            quantity: 1,
          },
        ],
        successURL: 'http://localhost:8080/payment/SuccessView',
        cancelURL: 'http://localhost:8080/payment/ErrorView',
      };
    },
    methods: {
      submit () {
        // You will be redirected to Stripe's secure checkout page
        this.$refs.checkoutRef.redirectToCheckout();
      },
    },
  };
  </script>