export const statisticsSelectors = {
    getRating(state) {
        return state.statistics.ratingInfo;
    },
    getTests(state) {
        return state.statistics.tests;
    },
    getPagination(state) {
        return state.statistics.pagination;
    },
}