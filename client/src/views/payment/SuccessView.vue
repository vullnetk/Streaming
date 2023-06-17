<template>
    <h1>Payment is Successful</h1>
</template>

<script>
import { updateSubscription } from '@/api/user'

export default {
    data() {
        return {
            user: this.$store.state.authenticate.user
        }
    },
    mounted() {
    if (this.user) {
      const uid = this.user.data.uid;
      // Call the updateSubscription function
      updateSubscription(uid)
        .then(response => {
          // Handle the response or perform any necessary actions
          console.log('Subscription updated successfully', response);
        })
        .catch(error => {
          // Handle the error or display an error message
          console.error('Failed to update subscription', error);
        });
    }
  }
}
</script>