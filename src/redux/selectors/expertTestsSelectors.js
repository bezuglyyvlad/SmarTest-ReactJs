export const expertTestsSelectors = {
  getExpertTests (state) {
    return state.expertTests.expertTests
  },
  getPagination (state) {
    return state.expertTests.pagination
  },
  getTestCreatedId (state) {
    return state.expertTests.testCreatedId
  }
}
