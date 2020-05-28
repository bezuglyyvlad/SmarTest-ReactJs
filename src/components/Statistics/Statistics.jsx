import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Typography from "@material-ui/core/Typography";
import {Preloader} from "../common/Preloader";
import {connect} from "react-redux";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {TablePaginationCreatorWithConnect} from "../common/UIElements";
import {appSelectors} from "../../redux/selectors/appSelectors";
import TestsTable from "./TestsTable/TestsTable";
import MyRating from "./MyRating/MyRating";
import Chart from "./Chart/Chart";
import {getRating, getTests} from "../../redux/statisticsReducer";
import {statisticsSelectors} from "../../redux/selectors/statisticsSelectors";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2)
    },
}));

const Statistics = React.memo(({perPage, getRating, getTests, ratingInfo, tests, pagination}) => {
    const classes = useStyles();
    const [ratingRequest, setRatingRequest] = React.useState(true);
    const [testsRequest, setTestsRequest] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [dense, setDense] = React.useState(false);

    useEffect(() => {
        (async () => {
            setRatingRequest(true);
            await getRating();
            setRatingRequest(false);
        })();
    }, [getRating]);

    useEffect(() => {
        (async () => {
            setTestsRequest(true);
            await getTests(page, perPage);
            setTestsRequest(false);
        })();
    }, [getTests, page, perPage]);


    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    const changePage = (event, newPage) => {
        setPage(newPage + 1);
    }

    if (ratingRequest || testsRequest) return <Preloader/>;

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Typography component="h1" variant="h5" align='center'>
                Статистика
            </Typography>
            <MyRating rating={ratingInfo.rating} ratingByCategory={ratingInfo.ratingByCategory}/>
            <Chart data={ratingInfo.chartData}/>
            <TestsTable dense={dense} data={tests}/>
            <TablePaginationCreatorWithConnect
                pagination={pagination}
                changePage={changePage}/>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} color='primary'/>}
                label='Зробити компактніше'
            />
        </Container>
    );
});

const mapStateToProps = (state) => ({
    perPage: appSelectors.getPerPage(state),
    ratingInfo: statisticsSelectors.getRating(state),
    tests: statisticsSelectors.getTests(state),
    pagination: statisticsSelectors.getPagination(state),
})

export default compose(withUnAuthRedirect, connect(mapStateToProps, {getRating, getTests}))(Statistics);