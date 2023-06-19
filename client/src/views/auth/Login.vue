<template>
<div class="row justify-content-center align-items-center mt-4">
  <div class="col-8">
        <div class="card card-container border-0">
                <div class="card-body p-0">
                    <div class="row no-gutters">
                        <div class="col-lg-6">
                          <div class="p-5">
                                <h4 class="h3 mb-30" style="color:crimson">Login</h4>
                                <br>
                                <form @submit="signin">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email Address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" v-model="email" required/>
                                    </div>
                                    <br>
                                    <div class="form-group mb-5">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" required/>
                                    </div>
                                    <div class="d-grid gap-2">
                                      <button type="submit" class="btn btn-theme">Login</button>
                                    </div>
                                </form>
                                <div class="d-grid gap-2 mt-3">
                                  <button class="btn btn-theme" @click="signinWithGoogle">Sign in with Google</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 d-none d-lg-inline-block">
                            <div class="account-block rounded-right">
                                <div class="overlay rounded-right"></div>
                                <div class="account-testimonial">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          <p class="text-muted text-center mt-3 mb-0">Don't have an account? <span class="text-primary ml-1 sign-up__link" @click="goToSignUp">Sign Up!</span></p>
    </div>
</div>
</template>


<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
// import { toast } from 'vue3-toastify';
// import 'vue3-toastify/dist/index.css';  

export default {
  data() {
    return {
      email: null,
      password: null,
      errorMessage: null,
      autoDismissingAlert: 5000,
      autoDismissingAlertInterval: 1000,
      autoDismissingAlertCountdown: 0
    }
  },
  methods: {
    async signin() {
      try {
        await this.$store.dispatch('loginUser', {
          email: this.email,
          password: this.password,
        })

        if(!(this.email.includes("@eStreaming"))) {
          this.$router.push({ name: 'home'}).then(() =>
          window.location.reload()
          );
        } else {
          this.$router.push({ name: 'movies'}).then(() =>
          window.location.reload()
          );
        }
      } catch (error) {
        this.errorMessage = error.message
        //  toast("Login Failed", {
        //   autoClose: 1000,
        // }
        console.log(this.errorMessage);
      }

    },
    async signinWithGoogle() {
      try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        const isPopupBlocked = window.innerHeight === 0 || document.hidden;

        if (isPopupBlocked) {
          // Display an error message or provide an alternative sign-in method
          console.log("Popup is blocked. Please allow popups to sign in with Google.");
          return;
        }
        const { user } = await signInWithPopup(auth, provider);
        await this.$store.dispatch('loginUser', {
          email: user.email,
          // password: user.password,
        })
        // Redirect based on the user's email domain
        if (!(user.email.includes("@eStreaming"))) {
          this.$router.push({ name: 'home' }).then(() =>
          window.location.reload()
          );
        } else {
          this.$router.push({ name: 'movies' }).then(() =>
          window.location.reload()
          );;
        }
      } catch (error) {
        console.log(error);
      }
    },
    
    goToSignUp() {
      this.$router.push({ path: "/register"})
    }
  },
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
    object-fit: contain;
}

.text-theme {
    color: crimson !important;
}
.btn-theme {
    background-color: crimson;
    border-color: crimson;
    color: #fff;
}

.sign-up__link:hover{
  cursor: pointer;
}

</style>