import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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

createApp(App).use(store).use(router).mount('#app')
