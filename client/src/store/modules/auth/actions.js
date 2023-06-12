import {signin, userSignOut} from '@/api/user'
import { getAuth } from "firebase/auth";
import {setCookie} from '@/helper/auth.js'

export const loginUser = ({commit}, userData) => {
    return new Promise((resolve, reject) => {
        console.log(userData)
        signin(userData)
        .then((response) =>{
            console.log(response)
            setCookie('userId', response.user.uid, 7);
            const auth = getAuth()
            console.log(auth)
            commit('storeUser', auth.currentUser)
            resolve(response)
        })
        .catch(error => { reject(error) })
    })
};

export const logout = ({commit}) => {
    return new Promise((resolve, reject) => {
        userSignOut()
        .then((response) =>{
            console.log(response)
            commit('removeUser')
            resolve(response)
        })
        .catch(error => { reject(error) })
    })
};

export const updateUser = ({commit}) => {
    const auth = getAuth()
    console.log(auth)
    commit('updateUser', auth.currentUser)
};
