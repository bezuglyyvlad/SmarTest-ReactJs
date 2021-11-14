export const userSelectors = {
  getIsAuth (state) {
    return state.user.isAuth
  },
  getName (state) {
    return state.user.name
  },
  getEmail (state) {
    return state.user.email
  },
  getUserId (state) {
    return state.user.userId
  },
  getRoles (state) {
    return state.user.roles
  }
}
