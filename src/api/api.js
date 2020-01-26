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
    },
    updateData(userId, username, email, password, bearerToken) {
        return instance.put(`users/${userId}`, {username, email, password}, authHeader(bearerToken));
    },
    deleteUser(userId, bearerToken) {
        return instance.delete(`users/${userId}`, authHeader(bearerToken));
    }
}