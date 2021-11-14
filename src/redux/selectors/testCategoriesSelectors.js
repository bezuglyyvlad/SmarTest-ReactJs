export const testCategoriesSelectors = {
  getTestCategories (state) {
    return state.testCategories.testCategories
  },
  getBreadcrumbs (state) {
    return state.testCategories.breadcrumbs
  },
  getPagination (state) {
    return state.testCategories.pagination
  }
}
