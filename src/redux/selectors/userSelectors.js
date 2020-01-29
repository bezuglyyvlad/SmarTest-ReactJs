export const userSelectors = {
    getIsAuth(state) {
        return state.user.isAuth;
    },
    getUsername(state) {
        return state.user.username;
    },
    getEmail(state) {
        return state.user.email;
    },
    getUserId(state) {
        return state.user.userId;
    }
}