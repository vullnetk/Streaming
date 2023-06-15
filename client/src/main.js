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
export { app, auth }

createApp(App).use(BootstrapVueNext).use(Vue3Toastify, { autoClose: 3000 }).use(VueGoodTablePlugin).use(store).use(router).mount('#app')

//comment