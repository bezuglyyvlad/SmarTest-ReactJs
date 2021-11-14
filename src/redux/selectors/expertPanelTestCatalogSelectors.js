export const expertPanelTestCatalogSelectors = {
  getExpertTests (state) {
    return state.expertPanelTestCatalog.expertTests
  },
  getTestCategories (state) {
    return state.expertPanelTestCatalog.testCategories
  },
  getParentSelect (state) {
    return state.expertPanelTestCatalog.parentSelect
  },
  getBreadcrumbs (state) {
    return state.expertPanelTestCatalog.breadcrumbs
  }
}
