import { memo } from 'react'
import Chart from "react-apexcharts";
import { ApexOptions } from "../../../../utils/utils";
import { useTheme } from "@material-ui/core";
import { withLazyLoad } from "../../../../hoc/withLazyLoad";
import { compose } from "redux";
import { withContentRect } from "react-measure";

const ApexChartHeatmap = memo(({
                                 measureRef,
                                 contentRect,
                                 id,
                                 titleText,
                                 series,
                                 defaultWidth = 350
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
              titleText
            ).options
          }
          series={series}
          type='heatmap'
          height={chartWidth / 16 * 10}
        />
      </div>
    )
  }
)

export default compose(
  withLazyLoad,
  withContentRect('bounds')
)(ApexChartHeatmap)
