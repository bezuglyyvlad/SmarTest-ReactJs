export const expertPanelTestStatisticsSelectors = {
  getTests (state) {
    return state.expertPanelTestStatistics.tests
  },
  getTestCategoryBreadcrumbs (state) {
    return state.expertPanelTestStatistics.testCategoryBreadcrumbs
  },
  getExpertTestName (state) {
    return state.expertPanelTestStatistics.expertTestName
  },
  getDataMining (state) {
    return state.expertPanelTestStatistics.dataMining
  }
}
