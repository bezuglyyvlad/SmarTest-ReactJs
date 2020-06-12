export const subcategoriesSelectors = {
    getSubcategories(state) {
        return state.subcategories.subcategories;
    },
    getPagination(state) {
        return state.subcategories.pagination;
    },
    getTestCreatedId(state) {
        return state.subcategories.testCreatedId;
    }
}