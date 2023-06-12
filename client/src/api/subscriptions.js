import axios from 'axios'


export function getsubscriptions(){
    return axios.get(`/api/subscriptions`)
}

export function insertsubscription(subscription) {
    console.log(subscription)
    return axios.post(`/api/uploadSubscription`, subscription)
}

export function editsubscription(subscription) {
    console.log(subscription)
    return axios.put(`/api/editsubscription/${subscription._id}`, subscription)
}

export function removesubscription(subscriptionId) {
    return axios.delete(`/api/subscription/delete/${subscriptionId}`)
}

export function getsubscription(subscriptionId) {
    return axios.get(`/api/subscription/${subscriptionId}`)
}