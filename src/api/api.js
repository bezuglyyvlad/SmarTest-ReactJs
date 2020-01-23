import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://api-test/api/v1/',
});

const authHeader = (bearerToken) => ({
    headers: {Authorization: `Bearer ${bearerToken}`}
})

export const userAPI = {
    login(email, password) {
        return instance.post('users/login', {email, password});
    },
    logout(bearerToken) {
        return instance.delete('users/logout', authHeader(bearerToken))
    },
    getData(bearerToken) {
        return instance.get('users', authHeader(bearerToken))
    }
}