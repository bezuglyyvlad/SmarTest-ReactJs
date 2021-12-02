import { memo } from 'react'
import Chart from "react-apexcharts";
import { ApexOptions } from "../../../../utils/utils";
import { useTheme } from "@material-ui/core";
import { withLazyLoad } from "../../../../hoc/withLazyLoad";
import { compose } from "redux";
import { withContentRect } from "react-measure";

const ApexChartBoxplot = memo(({
                                 measureRef,
                                 contentRect,
                                 id,
                                 titleText,
                                 series,
                                 defaultWidth = 350,
                                 xaxisTitleText = undefined,
                                 tooltipFormatter = undefined,
                               }) => {
    const theme = useTheme()
    const chartWidth = contentRect.bounds.width ?? defaultWidth

    return (
      <div ref={measureRef}>
        <Chart
          options={
            ApexOptions(
              theme,
              id,
              titleText,
              {
                type: 'numeric',
                title: { text: xaxisTitleText },
                decimalsInFloat: 0,
                tooltip: {
                  formatter: tooltipFormatter && function (val) {
                    return tooltipFormatter[val - 1]
                  }
                }
              },
              undefined,
              {
                shared: false,
                intersect: true
              }
            ).options
          }
          series={series}
          type='boxPlot'
          height={chartWidth / 16 * 10}
        />
      </div>
    )
  }
)

export default compose(
  withLazyLoad,
  withContentRect('bounds')
)(ApexChartBoxplot)
