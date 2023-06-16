import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVueNext } from 'bootstrap-vue-next'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import Vue3Toastify from 'vue3-toastify'
import VueGoodTablePlugin from 'vue-good-table-next'

import 'vue-good-table-next/dist/vue-good-table-next.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken } from "firebase/messaging";


// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDiWlCeKPYy1mVAGpy-MrjDDrhv_4PKQXY",
    authDomain: "streaming-d8515.firebaseapp.com",
    projectId: "streaming-d8515",
    storageBucket: "streaming-d8515.appspot.com",
    messagingSenderId: "743203501894",
    appId: "1:743203501894:web:b05afa1a0eedcd9be19747",
    measurementId: "G-CFLGHEW2BE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging(app);
getToken(messaging, { vapidKey: 'BGavuEkPNbq19CBpi8LhAZg23Cz-TjnXHyvxvhXzpYTfJ32EUGzZi-jV3kHbwMrPzzCX82q87_Xa7mvuaOyVHF8' }).then((currentToken) => {
  if (currentToken) {
    axios.post('api/getToken', { token: currentToken })
        .then((response) => {
          if (response.status === 200) {
            console.log('Token send successfully!')
          } else {
            console.log('Failed to send token to the server.');
          }
        })
        .catch((error) => {
          console.log('An error occurred while sending the token.', error);
          // Handle the error accordingly
          // ...
        });
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

export { app, auth }

createApp(App).use(BootstrapVueNext).use(Vue3Toastify, { autoClose: 3000 }).use(VueGoodTablePlugin).use(store).use(router).mount('#app')

//comment