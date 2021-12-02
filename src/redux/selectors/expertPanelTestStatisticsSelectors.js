import { createSelector } from 'reselect'
import {
  getApexChartBarChartSeries,
  getApexChartBoxplotSeries,
  getApexChartHeatmapSeries,
  isObjectEmpty
} from '../../utils/utils'

export const expertPanelTestStatisticsSelectors = {
  getTests (state) {
    return state.expertPanelTestStatistics.tests
  },
  getDataMining (state) {
    return state.expertPanelTestStatistics.dataMining
  }
}

expertPanelTestStatisticsSelectors.getScoreHistSeries = createSelector(
  expertPanelTestStatisticsSelectors.getDataMining,
  dataMining => (
    !isObjectEmpty(dataMining) &&
    getApexChartBarChartSeries(['Кількість'], [dataMining.score_hist_count])
  )
)

expertPanelTestStatisticsSelectors.getSpentTimeHistSeries = createSelector(
  expertPanelTestStatisticsSelectors.getDataMining,
  dataMining => (
    !isObjectEmpty(dataMining) &&
    getApexChartBarChartSeries(['Кількість'], [dataMining.spent_time_m_hist_count])
  )
)

expertPanelTestStatisticsSelectors.getNumberOfTestPassesHistSeries = createSelector(
  expertPanelTestStatisticsSelectors.getDataMining,
  dataMining => (
    !isObjectEmpty(dataMining) &&
    getApexChartBarChartSeries(['Кількість'], [dataMining.number_of_test_passes_hist_count])
  )
)

expertPanelTestStatisticsSelectors.getScoreByYearSeries = createSelector(
  expertPanelTestStatisticsSelectors.getDataMining,
  dataMining => (
    !isObjectEmpty(dataMining) &&
    getApexChartBarChartSeries(['Оцінка (медіана)'], [dataMining.score_by_year.data.flat()])
  )
)

expertPanelTestStatisticsSelectors.getDataByNumberOfTestPassesSeries = createSelector(
  expertPanelTestStatisticsSelectors.getDataMining,
  dataMining => (
    !isObjectEmpty(dataMining) &&
    getApexChartBarChartSeries(
      [
        'Оцінка (медіана)',
        'Витрачений час, хв. (медіана)'
      ],
      [
        Object.values(dataMining.data_by_number_of_test_passes.score_median),
        Object.values(dataMining.data_by_number_of_test_passes.spent_time_m_median)
      ]
    )
  )
)

expertPanelTestStatisticsSelectors.getQuestionHistSeriesArray = createSelector(
  expertPanelTestStatisticsSelectors.getDataMining,
  dataMining => (
    !isObjectEmpty(dataMining) &&
    Object.entries(dataMining.question_hists).map((value, index) => (
      getApexChartBarChartSeries(['Кількість'], [value[1][0]])
    ))
  )
)

expertPanelTestStatisticsSelectors.getNumberOfQuestionsBoxplotSeries = createSelector(
  expertPanelTestStatisticsSelectors.getDataMining,
  dataMining => (
    !isObjectEmpty(dataMining) &&
    getApexChartBoxplotSeries(
      [dataMining.number_of_questions_describe],
      [dataMining.number_of_questions_outliers]
    )
  )
)

expertPanelTestStatisticsSelectors.getQuestionsBoxplotSeries = createSelector(
  expertPanelTestStatisticsSelectors.getDataMining,
  dataMining => (
    !isObjectEmpty(dataMining) &&
    getApexChartBoxplotSeries(
      Object.values(dataMining.questions_describe),
      Object.values(dataMining.question_outliers)
    )
  )
)

expertPanelTestStatisticsSelectors.getQuestionCorrelationSeries = createSelector(
  expertPanelTestStatisticsSelectors.getDataMining,
  dataMining => (
    !isObjectEmpty(dataMining) &&
    getApexChartHeatmapSeries(Object.entries(dataMining.question_correlation))
  )
)
