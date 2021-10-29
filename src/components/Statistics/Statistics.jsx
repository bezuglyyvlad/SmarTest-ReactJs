import {memo, useState, useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import Container from '@mui/material/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Typography from "@mui/material/Typography";
import {Preloader} from "../common/Preloader";
import {connect} from "react-redux";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
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

const Statistics = memo(({perPage, getRating, getTests, ratingInfo, tests, pagination}) => {
    const classes = useStyles();
    const [ratingRequest, setRatingRequest] = useState(true);
    const [testsRequest, setTestsRequest] = useState(true);
    const [page, setPage] = useState(1);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        let mounted = true; // exclude memory leak
        (async () => {
            setRatingRequest(true);
            await getRating();
            mounted && setRatingRequest(false);
        })();
        return () => mounted = false;
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

    const indexFirstItem = pagination.total - ((pagination.current_page - 1) * pagination.per_page);

    return (
        <Container component="main" maxWidth="lg" className={classes.root}>
            <Typography component="h1" variant="h5" align='center'>
                Статистика
            </Typography>
            <MyRating rating={ratingInfo.rating} ratingByCategory={ratingInfo.ratingByCategory}/>
            <Chart data={ratingInfo.chartData}/>
            <TestsTable dense={dense} data={tests} indexFirstItem={indexFirstItem}/>
            <TablePaginationCreatorWithConnect
                pagination={pagination}
                changePage={changePage}/>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
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