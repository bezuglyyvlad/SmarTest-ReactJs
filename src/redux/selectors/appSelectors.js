export const appSelectors = {
    getInitialized(state) {
        return state.app.initialized;
    },
    getError(state) {
        return state.app.error;
    }
}