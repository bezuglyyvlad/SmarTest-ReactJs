import * as axios from 'axios'
import {
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS
} from '../utils/localStorage'

export const apiURL = 'http://api-smartest-laravel/api/V1/' // for development
// export const apiURL = 'https://d-test.pp.ua/api/v1/' // for production

const instance = axios.create({
  withCredentials: true,
  baseURL: apiURL
})

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessTokenFromLS()
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// for multiple requests
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (originalRequest.url !== 'oauth/token' && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalRequest._retry) {
        if (originalRequest.url === 'oauth/token/refresh') {
          return Promise.reject(error)
        }

        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject })
          }).then(accessToken => {
            return instance(originalRequest)
          }).catch(err => {
            return Promise.reject(err)
          })
        }

        originalRequest._retry = true
        isRefreshing = true

        return new Promise(function (resolve, reject) {
          instance.post('oauth/token/refresh', { refresh_token: getRefreshTokenFromLS() })
            .then(response => {
              const { access_token: accessToken, refresh_token: refreshToken } = response.data
              setAccessTokenToLS(accessToken)
              setRefreshTokenToLS(refreshToken)
              processQueue(null, accessToken)
              resolve(instance(originalRequest))
            })
            .catch((err) => {
              processQueue(err, null)
              reject(err)
            })
            .finally(() => {
              isRefreshing = false
            })
        })
      }
    }

    return Promise.reject(error)
  }
)

export const userAPI = {
  signIn (email, password) {
    return instance.post('oauth/token', { username: email, password })
  },
  signUp (name, email, password, passwordConfirmation) {
    return instance.post('users', { name, email, password, password_confirmation: passwordConfirmation })
  },
  signOut () {
    return instance.post('users/logout')
  },
  getData () {
    return instance.get('users')
  },
  updateData (userId, name, email, password, passwordConfirmation) {
    return instance.put(`users/${userId}`, {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    })
  },
  deleteUser (userId) {
    return instance.delete(`users/${userId}`)
  }
}

export const testCategoriesAPI = {
  getData (testCategoryId, page) {
    const testCategoryIdQueryString = testCategoryId ? `test_category_id=${testCategoryId}&` : ''
    return instance.get(`test-categories?${testCategoryIdQueryString}page=${page}`)
  }
}

export const expertTestsAPI = {
  getData (testCategoryId, page) {
    return instance.get(`expert-tests?test_category_id=${testCategoryId}&page=${page}`)
  }
}

export const testCategoryAPI = {
  getData (testCategoryId) {
    return instance.get('categories/' + testCategoryId)
  },
  updateCategory (id, title, parentId, userEmail) {
    return instance.put(
      `test-categories/${id}`,
      {
        title,
        ...(parentId) && { parent_id: parentId },
        ...(userEmail) && { user_email: userEmail }
      }
    )
  },
  addCategory (title, parentId, userEmail) {
    return instance.post(
      'test-categories',
      {
        title,
        ...(parentId) && { parent_id: parentId },
        ...(userEmail) && { user_email: userEmail }
      }
    )
  },
  deleteCategory (id) {
    return instance.delete(`test-categories/${id}`)
  }
}

export const expertTestAPI = {
  getData (subcategoryId) {
    return instance.get(`subcategories/${subcategoryId}?fields=subcategory_id,name`)
  }
}

export const testAPI = {
  createTest (expertTestId) {
    return instance.post('tests', { expert_test_id: expertTestId })
  },
  getTest (testId) {
    return instance.get(`tests/${testId}`)
  },
  nextQuestion (testId, answer) {
    return instance.post('tests/nextQuestion', { test_id: testId, answer })
  },
  getResult (testId) {
    return instance.get(`tests/result?test_id=${testId}`)
  }
}

export const statisticsAPI = {
  getRating () {
    return instance.get('tests/rating')
  },
  getTests (page, perPage) {
    return instance.get(`tests?page=${page}&perPage=${perPage}`)
  }
}

export const adminPanelAPI = {
  getCategories () {
    return instance.get('admin-panels')
  }
}

export const expertPanelTestCategoriesAPI = {
  getTestCategories () {
    return instance.get('expert-panels')
  }
}

export const expertPanelTestCatalogAPI = {
  getExpertTests (testCategoryId) {
    return instance.get(`expert-panels/expertTests/${testCategoryId}`)
  },
  getTestCategories (testCategoryId) {
    return instance.get(`expert-panels/${testCategoryId}`)
  },
  getTestStatistics (expertTestId) {
    return instance.get(`expert-panels/testStatistics/${expertTestId}`)
  },
  getDataMining (expertTestId) {
    return instance.get(`expert-panels/dataMining/${expertTestId}`)
  },
  addTest (data) {
    return instance.post('expert-tests', data)
  },
  updateTest (id, title, isPublished) {
    return instance.put(`expert-tests/${id}`, { title, is_published: isPublished })
  },
  deleteTest (expertTestId) {
    return instance.delete(`expert-tests/${expertTestId}`)
  }
}

export const expertPanelQuestionsAPI = {
  getQuestions (subcategoryId) {
    return instance.get('experts/questions?subcategory_id=' + subcategoryId)
  },
  deleteQuestion (questionId) {
    return instance.delete(`questions/${questionId}`)
  },
  addQuestion (data) {
    return instance.post('experts/question', data,
      { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  importQuestions (data) {
    return instance.post('experts/import', data,
      { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  exportQuestions (subcategoryId) {
    return instance.get(`experts/export?id=${subcategoryId}&expand=answers`)
  }
}

export const expertPanelQuestionAPI = {
  getQuestion (questionId) {
    return instance.get(`questions/${questionId}`)
  },
  updateQuestion (data, questionId) {
    return instance.put(`questions/${questionId}`, data)
  },
  uploadImage (data, questionId) {
    return instance.post(`experts/upload?id=${questionId}`, data,
      { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  deleteImage (questionId) {
    return instance.delete(`experts/deleteImage?id=${questionId}`)
  }
}

export const expertPanelAnswersAPI = {
  getAnswers (questionId) {
    return instance.get(`answers?question_id=${questionId}`)
  },
  addAnswer (data) {
    return instance.post('answers', data)
  },
  updateAnswer (data) {
    return instance.put(`answers/${data.answer_id}`, data)
  },
  deleteAnswer (answerId) {
    return instance.delete(`answers/${answerId}`)
  }
}
