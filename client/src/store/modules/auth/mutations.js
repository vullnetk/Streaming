import * as auth from '@/helper/auth'

export const storeUser = (state, userData) => {
    state.user.authenticated = true;
    state.user.data = userData;

    auth.storeUser(JSON.stringify(userData));
}

export const removeUser = (state) => {
    state.user.authenticated = false;
    state.user.data = null;

    auth.removeUser()
}

export const updateUser = (state, userData) => {
    state.user.data = userData;
    auth.removeUser()
    auth.storeUser(JSON.stringify(userData));
}
