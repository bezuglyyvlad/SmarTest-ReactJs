import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://api-test/api/v1/',
});

const authHeader = (bearerToken) => ({
    headers: {Authorization: `Bearer ${bearerToken}`}
})

export const userAPI = {
    signIn(email, password) {
        return instance.post('users/login', {email, password});
    },
    signUp(username, email, password) {
        return instance.post('users', {username, email, password});
    },
    signOut(bearerToken) {
        return instance.delete('users/logout', authHeader(bearerToken))
    },
    getData(bearerToken) {
        return instance.get('users', authHeader(bearerToken))
    }
}