import * as axios from "axios";
import {getBearerTokenFromLS} from "../utils/utils";

export const apiURL = 'http://api-test/api/v1/'; //for development
// export const apiURL = 'https://d-test.pp.ua/api/v1/'; //for production

const instance = axios.create({
    withCredentials: true,
    baseURL: apiURL,
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

export const subcategoryAPI = {
    getData(subcategory_id) {
        return instance.get(`subcategories/${subcategory_id}?fields=subcategory_id,name`, authHeader());
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

export const statisticsAPI = {
    getRating() {
        return instance.get('tests/rating', authHeader());
    },
    getTests(page, perPage) {
        return instance.get(`tests?page=${page}&per-page=${perPage}`, authHeader());
    }
}

export const adminPanelAPI = {
    getCategories() {
        return instance.get('admins?expand=user', authHeader());
    },
    updateCategory(category_id, name, userEmail) {
        return instance.put(`categories/${category_id}`, {name, userEmail}, authHeader());
    },
    addCategory(name, userEmail) {
        return instance.post('categories', {name, userEmail}, authHeader());
    },
    deleteCategory(category_id) {
        return instance.delete(`categories/${category_id}`, authHeader());
    }
}

export const expertCategoriesAPI = {
    getCategories() {
        return instance.get('experts', authHeader());
    },
}

export const expertTestsAPI = {
    getTests(category_id) {
        return instance.get('experts/subcategories?category_id=' + category_id, authHeader());
    },
    addTest(data) {
        return instance.post('subcategories', data, authHeader());
    },
    updateTest(data) {
        return instance.put(`subcategories/${data.subcategory_id}`, data, authHeader());
    },
    deleteTest(subcategory_id) {
        return instance.delete(`subcategories/${subcategory_id}`, authHeader());
    }
}

export const expertQuestionsAPI = {
    getQuestions(subcategory_id) {
        return instance.get('experts/questions?subcategory_id=' + subcategory_id, authHeader());
    },
    deleteQuestion(question_id) {
        return instance.delete(`questions/${question_id}`, authHeader());
    },
    addQuestion(data) {
        return instance.post('experts/question', data,
            {headers: Object.assign(authHeader().headers, {'Content-Type': 'multipart/form-data'})});
    }
}

export const expertQuestionAPI = {
    getQuestion(question_id) {
        return instance.get(`questions/${question_id}`, authHeader());
    },
    updateQuestion(data) {
        return instance.put(`questions/${data.question_id}`, data, authHeader());
    },
}

export const expertAnswersAPI = {
    getAnswers(question_id) {
        return instance.get(`answers?question_id=${question_id}`, authHeader());
    },
    addAnswer(data) {
        return instance.post('answers', data, authHeader());
    },
    updateAnswer(data) {
        return instance.put(`answers/${data.answer_id}`, data, authHeader());
    },
    deleteAnswer(answer_id) {
        return instance.delete(`answers/${answer_id}`, authHeader());
    },
}