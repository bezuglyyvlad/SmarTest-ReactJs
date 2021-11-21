import { memo } from 'react'
import { materialTableLocalization } from "../../../../utils/localization";
import MaterialTable from "material-table";
import { appSelectors } from "../../../../redux/selectors/appSelectors";
import { compose } from "redux";
import { connect } from "react-redux";
import { changePerPage } from "../../../../redux/appReducer";
import { expertPanelTestStatisticsSelectors } from "../../../../redux/selectors/expertPanelTestStatisticsSelectors";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}))

const DataMiningMaterialTable = memo(({
                                        perPage,
                                        changePerPage,
                                        expertTestName,
                                        data,
                                        title,
                                        fields,
                                        exportFileNamePrefix,
                                        paging = true
                                      }) => {
    const classes = useStyles()

    function setPerPage (perPage) {
      changePerPage(perPage)
    }

    return (
      <Box className={classes.root}>
        <MaterialTable
          title={title}
          columns={fields.map(i => ({
            title: i.name !== 'index' ? i.name : '',
            field: i.name
          }))}
          data={data}
          options={{
            sorting: true,
            pageSize: +perPage,
            exportButton: { csv: true, pdf: false },
            exportAllData: true,
            exportFileName: exportFileNamePrefix + expertTestName,
            paging: paging
          }}
          localization={materialTableLocalization}
          onChangeRowsPerPage={setPerPage}
        />
      </Box>
    )
  }
)

const mapStateToProps = (state) => ({
  perPage: appSelectors.getPerPage(state),
  expertTestName: expertPanelTestStatisticsSelectors.getExpertTestName(state),
})

export default compose(connect(mapStateToProps, {
  changePerPage,
}))(DataMiningMaterialTable)
