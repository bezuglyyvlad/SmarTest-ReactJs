export const appSelectors = {
    getInitialized(state) {
        return state.app.initialized;
    },
    getTheme(state) {
        return state.app.theme;
    },
    getPerPage(state) {
        return state.app.perPage;
    }
}