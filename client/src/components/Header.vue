<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <router-link to="/" class="nav-item nav-link w-auto ">BlockBuster</router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav class="justify-content-between">
      <b-navbar-nav>
        <router-link to="/" class="nav-item nav-link w-auto m-auto">Home</router-link>
          <b-nav-item-dropdown class="nav-item nav-link w-auto m-auto" v-if="userRole" text="Admin">
            <router-link to="/movies" class="nav-item nav-link w-auto m-auto">Movie</router-link>
            <router-link to="/genres" class="nav-item nav-link w-auto m-auto">Genres</router-link>
            <router-link to="/castCrewRoles" class="nav-item nav-link w-auto m-auto">Cast Crew Roles</router-link>
            <router-link to="/CastCrews" class="nav-item nav-link w-auto m-auto">Cast Crew</router-link>
            <router-link to="/subs" class="nav-item nav-link w-auto m-auto">Subscription</router-link>
            <router-link to="/users" class="nav-item nav-link w-auto m-auto">Users</router-link>
            <router-link to="/wishlist" class="nav-item nav-link w-auto m-auto">Requests</router-link>
          </b-nav-item-dropdown>
          <router-link v-if="userSubscription && userAuth && !userRole" to="/addRequest" class="nav-item nav-link w-auto m-auto">Make a request</router-link>
          <router-link v-else-if="userAuth && !userRole" to="/payment" class="nav-item nav-link w-auto m-auto">Subscribe</router-link>
      </b-navbar-nav>
        <b-navbar-nav class="ml-auto justify-content-end">
          <router-link v-if="userAuth" to="/profile" class="nav-item nav-link w-auto m-auto">Hello user</router-link>
          <router-link v-if="userAuth" to="/welcome" @click="signOut" class="nav-link w-auto m-auto">Logout</router-link>
          <router-link v-else to="/login"  class="nav-link w-auto m-auto">Sign in</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as auth from '../helper/auth'
import {getUser} from '@/api/user'
export default {
    data() {
        return {
            userLocalStorage: localStorage.getItem('user'),
            user: null,
            userId: null,
            userRole: null,
            userSubscription: null,
            userAuth: null,
            width: null
        }
    },
    computed: {
        getSize(){
            return this.width
        },
        // ...mapGetters({
        //     user: 'getUser'
        // }),
    },
    mounted(){
        this.onResize()
        this.$nextTick(() => {
          window.addEventListener('resize', this.onResize);
        })
        this.userLocalStorage = JSON.parse(localStorage.getItem('user'))
        if (this.userLocalStorage) {
          this.userId = this.userLocalStorage.uid;
          this.getUser();
        }
        this.getUserAuth().then(() => {
          // Check userAuth value here
          console.log(this.userAuth);
        });
        // console.log(this.userLocalStorage)
    },
    watch: {
        '$store.state.authenticate.user.data': function() {
            this.userLocalStorage = JSON.parse(localStorage.getItem('user'))
            // this.userId = this.userLocalStorage.uid
        }
    },
    beforeDestroy() { 
      window.removeEventListener('resize', this.onResize); 
    },
    methods: {
        onResize() {
            this.width = window.innerWidth
        },
        async signOut(){
            try {
                await this.$store.dispatch('logout').then(() =>
                window.location.reload()
                )
                // this.$router.push({ path: "/login" })
            } catch (err) {
                console.log(err)
            }
        },
        async getUser(){
          console.log(this.userId)
          this.user = await getUser(this.userId)
          console.log(this.user.data)
          this.userRole = this.user.data.isAdmin
          this.userSubscription = this.user.data.isSubscribed
        },
        async getUserAuth() {
          return new Promise(resolve => {
            this.userAuth = auth.getUser();
            resolve();
          });
        },
    }

}
</script>