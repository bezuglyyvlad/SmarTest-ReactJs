import * as axios from "axios";
import {getBearerTokenFromLS} from "../utils/utils";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://api-test/api/v1/',
});

const authHeader = () => ({
    headers: {Authorization: `Bearer ${getBearerTokenFromLS()}`}
})

export const userAPI = {
    signIn(email, password) {
        return instance.post('users/login', {email, password});
    },
    signUp(username, email, password) {
        return instance.post('users', {username, email, password});
    },
    signOut() {
        return instance.delete('users/logout', authHeader())
    },
    getData() {
        return instance.get('users', authHeader())
    },
    updateData(userId, username, email, password) {
        return instance.put(`users/${userId}`, {username, email, password}, authHeader());
    },
    deleteUser(userId) {
        return instance.delete(`users/${userId}`, authHeader());
    }
}

export const categoriesAPI = {
    getData(page, perPage) {
        return instance.get(`categories?page=${page}&per-page=${perPage}`, authHeader());
    },
}

export const subcategoriesAPI = {
    getData(category_id, page, perPage) {
        return instance.get(`subcategories?category_id=${category_id}&page=${page}&per-page=${perPage}`, authHeader());
    },
}

export const categoryAPI = {
    getData(category_id) {
        return instance.get('categories/' + category_id, authHeader());
    },
}