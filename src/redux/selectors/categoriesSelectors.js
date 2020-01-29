export const categoriesSelectors = {
    getCategories(state) {
        return state.categories.categories;
    },
    getPagination(state) {
        return state.categories.pagination;
    },
}