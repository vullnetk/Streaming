<template>
    <div>
      <h2>subscriptions List</h2>
      <ul>
        <li v-for="subscription in subscriptions" :key="subscription.id">
          {{ subscription.name }}
          <button @click="editsubscription(subscription)">Edit</button>
          <button @click="removesubscription(subscription.id)">Delete</button>
        </li>
      </ul>
      <form @submit.prevent="insertsubscription">
        <input type="text" v-model="newsubscription.name" placeholder="Enter subscription name" />
        <input type="number" v-model="newsubscription.price" placeholder="Enter subscription price" />
        <input type="text" v-model="newsubscription.description" placeholder="Enter subscription description" />
        <button type="submit">Add subscription</button>
        
      </form>
    </div>
  </template>
  
  <script>
  import { getsubscriptions, insertsubscription, editsubscription, removesubscription } from '../../api/subscriptions';
  
  export default {
    name: 'SubscriptionsList',
    data() {
      return {
        subscriptions: [],
        newsubscription: {
          name: '',
          price: '',
          description: ''
        },
      };
    },
    mounted() {
      //this.getsubscriptions();
    },
    methods: {
      // getsubscriptions() {
      //   getsubscriptions()
      //     .then(response => {
      //       this.subscriptions = response;
      //     })
      //     .catch(error => {
      //       console.error('Failed to fetch subscriptions:', error);
      //     });
      //},
      insertsubscription() {
        if (this.newsubscription.name.trim() !== '') {
          insertsubscription(this.newsubscription)
            .then(() => {
              this.newsubscription.name = '';
              //this.getsubscriptions();
            })
            .catch(error => {
              console.error('Failed to add subscription:', error);
            });
        }
      },
      editsubscription(subscription) {
        const newName = prompt('Enter new subscription name:', subscription.name);
        if (newName !== null) {
          editsubscription(subscription.id, newName)
            .then(() => {
              console.log('subscription edited successfully');
              this.getsubscriptions();
            })
            .catch(error => {
              console.error('Failed to edit subscription:', error);
            });
        }
      },
      removesubscription(id) {
        if (confirm('Are you sure you want to delete this subscription?')) {
          removesubscription(id)
            .then(() => {
              console.log('subscription deleted successfully');
              this.getsubscriptions();
            })
            .catch(error => {
              console.error('Failed to delete subscription:', error);
            });
        }
      },
    },
  };
  </script>
  