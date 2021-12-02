export const expertPanelBreadcrumbsSelectors = {
  getBreadcrumbs (state) {
    return state.expertPanelBreadcrumbs.breadcrumbs
  },
  getExpertTestName (state) {
    return state.expertPanelBreadcrumbs.expertTestName
  }
}
