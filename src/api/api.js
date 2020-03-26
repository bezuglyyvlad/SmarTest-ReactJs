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
    getData(page) {
        return instance.get(`categories?page=${page}`, authHeader());
    },
}

export const subcategoriesAPI = {
    getData(category_id, page) {
        return instance.get(`subcategories?category_id=${category_id}&page=${page}&expand=test`, authHeader());
    },
}

export const categoryAPI = {
    getData(category_id) {
        return instance.get('categories/' + category_id, authHeader());
    },
}

export const testAPI = {
    createTest(subcategory_id) {
        return instance.post('tests', {subcategory_id}, authHeader());
    },
    getTest(test_id) {
        return instance.get(`tests/${test_id}`, authHeader());
    },
    nextQuestion(test_id, answer) {
        return instance.post('tests/nextQuestion', {test_id, answer}, authHeader());
    },
    getResult(test_id) {
        return instance.get(`tests/result?test_id=${test_id}`, authHeader());
    }
}