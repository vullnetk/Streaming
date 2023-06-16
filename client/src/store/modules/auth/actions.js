import {signin, userSignOut} from '@/api/user'
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {setCookie} from '@/helper/auth.js'

export const loginUser = ({ commit }, userData) => {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      const { email, password } = userData;
      if (password) {
        // Email/password authentication
        signin(userData)
        .then((response) =>{
            setCookie('userId', response.user.uid, 7);
            const auth = getAuth()
            commit('storeUser', auth.currentUser)
            resolve(response)
        })
        .catch(error => { reject(error) });
      } else {
        // Google authentication
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        signInWithPopup(auth, provider)
          .then((response) => {
            setCookie('userId', response.user.uid, 7);
            commit('storeUser', response.user);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  };

export const logout = ({commit}) => {
    return new Promise((resolve, reject) => {
        userSignOut()
        .then((response) =>{
            commit('removeUser')
            resolve(response)
        })
        .catch(error => { reject(error) })
    })
};

export const updateUser = ({commit}) => {
    const auth = getAuth()
    commit('updateUser', auth.currentUser)
};
