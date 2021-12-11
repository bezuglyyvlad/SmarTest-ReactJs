import React, { memo } from 'react'
import Chart from "react-apexcharts";
import { ApexOptions } from "../../../../utils/utils";
import { useTheme } from "@material-ui/core";
import { withLazyLoad } from "../../../../hoc/withLazyLoad";
import { compose } from "redux";
import { withContentRect } from "react-measure";

const ApexChartBarChart = memo(({
                                  measureRef,
                                  contentRect,
                                  id,
                                  titleText,
                                  xaxisCategories,
                                  series,
                                  defaultWidth = 350,
                                  yaxisTitleText = undefined,
                                  xaxisTitleText = undefined
                                }) => {
    const theme = useTheme()
    const chartWidth = contentRect.bounds.width ?? defaultWidth

    return (
      <div ref={measureRef}>
        <Chart
          options={ApexOptions(
            theme,
            id,
            titleText,
            { categories: xaxisCategories, title: { text: xaxisTitleText } },
            yaxisTitleText
          ).options}
          series={series}
          type='bar'
          height={chartWidth / 16 * 10}
        />
      </div>
    )
  }
)

export default compose(
  withLazyLoad,
  withContentRect('bounds')
)(ApexChartBarChart)
