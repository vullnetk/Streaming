<template>
<div class="row justify-content-center align-items-center mt-4">
  <div class="col-8">
    <div class="card card-container border-0">
          <div class="card-body p-0">
              <div class="row no-gutters">
                  <div class="col-lg-6">
                      <div class="p-5">
                          <h4 class="h3 mb-30" style="color:darkblue">Register</h4>
                          <br>
                          <form @submit="registerUser">
                              <div class="form-group">
                                  <label for="yourName">Your name</label>
                                  <input type="text" class="form-control" id="yourName" v-model="fullname" required/>
                              </div>
                              <br>
                              <div class="form-group">
                                  <label for="exampleInputEmail1">Email address</label>
                                  <input type="email" class="form-control" id="exampleInputEmail1" v-model="email" required/>
                              </div>
                              <br>
                              <div class="form-group mb-5">
                                  <label for="exampleInputPassword1">Password</label>
                                  <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" required/>
                              </div>
                              <!-- <button type="submit" class="btn btn-theme">Register</button> -->
                              <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-theme">Register</button>
                              </div>
                              <div class="d-grid gap-2 mt-3">
                                <button @click="registerWithGoogle" class="btn btn-theme">Sign up with Google</button>
                              </div>
                          </form>
                      </div>
                  </div>
                  <div class="col-lg-6 d-none d-lg-inline-block">
                      <div class="account-block rounded-right">
                          <div class="overlay rounded-right"></div>
                          <div class="account-testimonial">
                              <!-- <img src="" alt=""> -->
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <p class="text-muted text-center mt-3 mb-0 cursor-pointer">Already have an account? <span class="text-primary ml-1 login-link" @click="goToSignIn">Login!</span></p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { insertUser } from '@/api/user.js'
// import { toast } from 'vue3-toastify';
// import 'vue3-toastify/dist/index.css';  
export default {
  data() {
    return {
      uid: null,
      fullname: null,
      email: null,
      password: null,
    }
  },
  methods: {
    async registerUser() {
      if(this.fullname && this.email && this.password){
        const auth = getAuth();
        try{
          const response = await createUserWithEmailAndPassword(auth, this.email, this.password)
          await updateProfile(auth.currentUser, {displayName: this.fullname})
          this.$router.push({ path: "/login" })
          //  toast("Registration Successful", {
            console.log("Registration Successful", {
              autoClose: 1000,
            });
          } catch(err) {
            console.log(err)
            //  toast("Registration Failed", {
              console.log("Registration Failed", {
                autoClose: 1000,
              });
            } finally {
              this.registerUserWithRole({uid: auth.currentUser.uid, fullname: this.fullname, email: this.email})
              // this.errorMessage = error.message
            }
          }else {
            // Google sign-up
            this.registerWithGoogle();
          }
        },
        async registerWithGoogle() {
          const auth = getAuth();
          const provider = new GoogleAuthProvider();

          try {
            const { user } = await signInWithPopup(auth, provider);
            const { displayName, email } = user;

            if (displayName) {
              // Use the display name from Google authentication
              await updateProfile(user, { displayName });
            } else {
              // Prompt the user for their full name if the display name is not available
              const fullname = prompt("Please enter your full name");
              await updateProfile(user, { displayName: fullname });
            }

            // Register the user with their role
            this.registerUserWithRole({ uid: user.uid, fullname: user.displayName || fullname, email });
            this.$router.push({ path: "/login" });
            console.log("Google Registration Successful");
          } catch (err) {
            console.log(err);
            console.log("Google Registration Failed");
          }
        },
    async registerUserWithRole(user) {
      await insertUser(user)
    },
    goToSignIn() {
      this.$router.push({ path: "/login"})
    }
  }
}
</script>

<style scoped lang="scss">

.card-container {
  padding: 2%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 8px;
  background: #fcfcfc;
}

.account-block {
    background-image: url(../../assets/sign-in.svg);
    background-repeat: no-repeat;
    background-size: contain;
    height: 100%;
    position: relative;
}

.text-theme {
    color: crimson !important;
}
.btn-theme {
    background-color: darkblue;
    border-color: darkblue;
    color: #fff;
}

.login-link:hover {
  cursor: pointer;
}

</style>