import { memo, useEffect, useState } from 'react'
import { compose } from "redux"
import { connect } from "react-redux"
import { expertPanelTestStatisticsSelectors } from "../../../redux/selectors/expertPanelTestStatisticsSelectors"
import { Preloader } from "../../common/Preloader"
import { getExpertDataMining } from "../../../redux/expertPanelTestStatisticsReducer"
import {
  Box,
  Grid,
  Hidden,
  makeStyles,
  Typography
} from "@material-ui/core"
import ApexChartBarChart from "./DataMiningCharts/ApexChartBarChart";
import DataMiningMaterialTable from "./DataMiningTables/DataMiningMaterialTable";
import ApexChartBoxplot from "./DataMiningCharts/ApexChartBoxplot";
import ApexChartHeatmap from "./DataMiningCharts/ApexChartHeatmap";
import { isObjectEmpty } from "../../../utils/utils";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2, 0),
  },
}))

const ExpertPanelTestStatisticsDataMining = memo(({
                                                    expert_test_id,
                                                    getExpertDataMining,
                                                    dataMining,
                                                    scoreHistSeries,
                                                    spentTimeHistSeries,
                                                    numberOfTestPassesHistSeries,
                                                    scoreByYearSeries,
                                                    dataByNumberOfTestPassesSeries,
                                                    questionHistSeriesArray,
                                                    numberOfQuestionsBoxplotSeries,
                                                    questionsBoxplotSeries,
                                                    questionCorrelationSeries
                                                  }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getExpertDataMining(expert_test_id)
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [expert_test_id, getExpertDataMining])

  if (showPreloader) {
    return <Preloader />
  }

  return (
    <Box className={classes.root}>
      {!isObjectEmpty(dataMining) &&
      <>
        <Typography component="h2" variant="h5" align='center' className={classes.title}>
          Інтелектуальний аналіз даних
        </Typography>
        <DataMiningMaterialTable
          data={dataMining.data_frame.data}
          title={`Фрейм даних (${dataMining.shape[0]}/${dataMining.shape[1]})`}
          fields={dataMining.data_frame.schema.fields}
          exportFileNamePrefix='DataFrame_' />
        <DataMiningMaterialTable
          data={dataMining.data_frame_describe.data}
          title='Опис'
          fields={dataMining.data_frame_describe.schema.fields}
          exportFileNamePrefix='DataFrameDescribe_'
          paging={false} />
        <ApexChartBarChart id='scoreHist'
                           titleText='Гістограма для оцінки'
                           xaxisCategories={dataMining.score_hist_division}
                           xaxisTitleText='Оцінка'
                           series={scoreHistSeries}
                           yaxisTitleText='Частота' />
        <ApexChartBarChart id='spentTimeHist'
                           titleText='Гістограма для витраченого часу'
                           xaxisCategories={dataMining.spent_time_m_hist_division}
                           xaxisTitleText='Витрачений час, хв.'
                           series={spentTimeHistSeries}
                           yaxisTitleText='Частота' />
        <ApexChartBarChart id='numberOfTestPassesHist'
                           titleText='Гістограма для кількості проходжень тесту'
                           xaxisCategories={dataMining.number_of_test_passes_hist_division}
                           xaxisTitleText='Кількість проходжень тесту'
                           series={numberOfTestPassesHistSeries}
                           yaxisTitleText='Частота' />
        <ApexChartBarChart id='scoreByYear'
                           titleText='Оцінка по роках'
                           xaxisCategories={dataMining.score_by_year.index}
                           series={scoreByYearSeries} />
        <ApexChartBarChart id='dataByNumberOfTestPasses'
                           titleText='Результати в залежності від кількості проходжень'
                           xaxisCategories={Object.keys(dataMining.data_by_number_of_test_passes.score_median)}
                           series={dataByNumberOfTestPassesSeries} />
        <ApexChartBoxplot id='numberOfQuestionsBoxplot'
                          titleText='Коробковий графік для кількості питань'
                          series={numberOfQuestionsBoxplotSeries} />
        <Hidden smDown>
          <ApexChartBoxplot id='questionsBoxplot'
                            titleText='Коробковий графік для питань'
                            xaxisTitleText='Ідентифікатор питання'
                            series={questionsBoxplotSeries} />
        </Hidden>
        <Typography component='h6' align='center' className={classes.title}>
          Гістограма для питань
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(dataMining.question_hists).map((value, index) => (
            <Grid item md={6} xs={12} key={index}>
              <ApexChartBarChart id={value[0] + 'hist'}
                                 titleText={value[0]}
                                 xaxisCategories={value[1][1]}
                                 xaxisTitleText='Оцінка, %'
                                 series={questionHistSeriesArray[index]}
                                 yaxisTitleText='Частота' />
            </Grid>
          ))}
        </Grid>
        <Hidden smDown>
          <ApexChartHeatmap id='questionCorrelation'
                            titleText='Кореляція питань за методом Пірсона'
                            series={questionCorrelationSeries} />
        </Hidden>
      </>
      }
    </Box>
  )
})

const mapStateToProps = (state) => ({
  dataMining: expertPanelTestStatisticsSelectors.getDataMining(state),
  scoreHistSeries: expertPanelTestStatisticsSelectors.getScoreHistSeries(state),
  spentTimeHistSeries: expertPanelTestStatisticsSelectors.getSpentTimeHistSeries(state),
  numberOfTestPassesHistSeries: expertPanelTestStatisticsSelectors.getNumberOfTestPassesHistSeries(state),
  scoreByYearSeries: expertPanelTestStatisticsSelectors.getScoreByYearSeries(state),
  dataByNumberOfTestPassesSeries: expertPanelTestStatisticsSelectors.getDataByNumberOfTestPassesSeries(state),
  questionHistSeriesArray: expertPanelTestStatisticsSelectors.getQuestionHistSeriesArray(state),
  numberOfQuestionsBoxplotSeries: expertPanelTestStatisticsSelectors.getNumberOfQuestionsBoxplotSeries(state),
  questionsBoxplotSeries: expertPanelTestStatisticsSelectors.getQuestionsBoxplotSeries(state),
  questionCorrelationSeries: expertPanelTestStatisticsSelectors.getQuestionCorrelationSeries(state),
})

export default compose(
  connect(mapStateToProps, { getExpertDataMining })
)(ExpertPanelTestStatisticsDataMining)
