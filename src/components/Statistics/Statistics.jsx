import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Typography from "@material-ui/core/Typography";
import {Preloader} from "../common/Preloader";
import {connect} from "react-redux";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Table from "@material-ui/core/Table";
import {Paper, TableRow} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {withRouter} from "react-router";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import {TablePaginationCreatorWithConnect} from "../common/UIElements";
import {appSelectors} from "../../redux/selectors/appSelectors";
import {Line} from "react-chartjs-2";
import {useTheme} from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import GradeIcon from '@material-ui/icons/Grade';
import Badge from "@material-ui/core/Badge";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    tableRow: {
        cursor: 'pointer'
    },
    titleTable: {
        padding: '16px 0 0 16px'
    },
    dense: {
        margin: theme.spacing(1, 0),
    },
    chart: {
        margin: theme.spacing(0, 0, 3),
    },
    rating: {
        margin: theme.spacing(1, 0),
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

const Statistics = React.memo(({history, perPage}) => {
    const theme = useTheme();
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [dense, setDense] = React.useState(false);

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    const changePage = (event, newPage) => {
        setCurrentPage(newPage + 1);
    }


    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);


    if (showPreloader) return <Preloader/>;

    const state = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [
            {
                label: 'Баллы',
                fill: true,
                borderColor: theme.palette.primary.main,
                data: [85, 90, 84, 80, 95, 92, 94, 97, 100, 95]
            }
        ]
    }

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Typography component="h1" variant="h5" align='center' className={classes.title}>
                Статистика
            </Typography>
            <Grid
                container
                justify="space-between"
                className={classes.rating}
            >
                <Grid item>
                    <Typography variant='h6'>
                        Рейтинг
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container alignItems='center' component={Badge} color='primary' variant='dot'
                          aria-owns={open ? 'mouse-over-popover' : undefined}
                          aria-haspopup="true"
                          onMouseEnter={handlePopoverOpen}
                          onMouseLeave={handlePopoverClose}>
                        <Typography variant='h6'>
                            80
                        </Typography>
                        <GradeIcon/>
                    </Grid>
                    <Popover
                        className={classes.popover}
                        classes={{
                            paper: classes.paper,
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography>Информатика - 80</Typography>
                        <Typography>Англ - 90</Typography>
                        <Typography>Биология - 100</Typography>
                    </Popover>
                </Grid>
            </Grid>
            <Box className={classes.chart}>
                <Line
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Баллы за последних 30 дней',
                            fontSize: 16
                        },
                        legend: {
                            display: false,
                        }
                    }}
                    height={200}
                />
            </Box>
            <TableContainer component={Paper}>
                <Typography variant='h6' className={classes.titleTable}>
                    Тесты
                </Typography>
                <Table
                    size={dense ? 'small' : 'medium'}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Категория</TableCell>
                            <TableCell>Баллы</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover onClick={() => history.push("/test/4/result")} className={classes.tableRow}>
                            <TableCell> sapiente, tempore. Adipisci, aut.</TableCell>
                            <TableCell>, saepe sapiente sed similique ullam voluptas!</TableCell>
                            <TableCell>5</TableCell>
                        </TableRow>
                        <TableRow hover onClick={() => history.push("/test/4/result")} className={classes.tableRow}>
                            <TableCell> sapiente, tempore. Adipisci, aut.</TableCell>
                            <TableCell>, saepe sapiente sed similique ullam voluptas!</TableCell>
                            <TableCell>5</TableCell>
                        </TableRow>
                        <TableRow hover onClick={() => history.push("/test/4/result")} className={classes.tableRow}>
                            <TableCell> sapiente, tempore. Adipisci, aut.</TableCell>
                            <TableCell>, saepe sapiente sed similique ullam voluptas!</TableCell>
                            <TableCell>5</TableCell>
                        </TableRow>
                        <TableRow hover onClick={() => history.push("/test/4/result")} className={classes.tableRow}>
                            <TableCell> sapiente, tempore. Adipisci, aut.</TableCell>
                            <TableCell>, saepe sapiente sed similique ullam voluptas!</TableCell>
                            <TableCell>5</TableCell>
                        </TableRow>
                        <TableRow hover onClick={() => history.push("/test/4/result")} className={classes.tableRow}>
                            <TableCell> sapiente, tempore. Adipisci, aut.</TableCell>
                            <TableCell>, saepe sapiente sed similique ullam voluptas!</TableCell>
                            <TableCell>5</TableCell>
                        </TableRow>
                        <TableRow hover onClick={() => history.push("/test/4/result")} className={classes.tableRow}>
                            <TableCell> sapiente, tempore. Adipisci, aut.</TableCell>
                            <TableCell>, saepe sapiente sed similique ullam voluptas!</TableCell>
                            <TableCell>5</TableCell>
                        </TableRow>
                        <TableRow hover onClick={() => history.push("/test/4/result")} className={classes.tableRow}>
                            <TableCell> sapiente, tempore. Adipisci, aut.</TableCell>
                            <TableCell>, saepe sapiente sed similique ullam voluptas!</TableCell>
                            <TableCell>5</TableCell>
                        </TableRow>
                        <TableRow hover onClick={() => history.push("/test/4/result")} className={classes.tableRow}>
                            <TableCell> sapiente, tempore. Adipisci, aut.</TableCell>
                            <TableCell>, saepe sapiente sed similique ullam voluptas!</TableCell>
                            <TableCell>5</TableCell>
                        </TableRow>
                        <TableRow hover onClick={() => history.push("/test/4/result")} className={classes.tableRow}>
                            <TableCell> sapiente, tempore. Adipisci, aut.</TableCell>
                            <TableCell>, saepe sapiente sed similique ullam voluptas!</TableCell>
                            <TableCell>5</TableCell>
                        </TableRow>
                        <TableRow hover onClick={() => history.push("/test/4/result")} className={classes.tableRow}>
                            <TableCell> sapiente, tempore. Adipisci, aut.</TableCell>
                            <TableCell>, saepe sapiente sed similique ullam voluptas!</TableCell>
                            <TableCell>5</TableCell>
                        </TableRow>
                        <TableRow hover onClick={() => history.push("/test/4/result")} className={classes.tableRow}>
                            <TableCell> sapiente, tempore. Adipisci, aut.</TableCell>
                            <TableCell>, saepe sapiente sed similique ullam voluptas!</TableCell>
                            <TableCell>5</TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>
            <TablePaginationCreatorWithConnect
                pagination={{currentPage: currentPage, totalCount: 40, perPage: +perPage}}
                changePage={changePage}/>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} color='primary'/>}
                label="Сделать компактнее"
                className={classes.dense}
            />
        </Container>
    );
});

const mapStateToProps = (state) => ({
    perPage: appSelectors.getPerPage(state),
})

export default compose(withUnAuthRedirect, withRouter, connect(mapStateToProps, {}))(Statistics);