import React, {useEffect} from 'react';
import {compose} from "redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import {connect} from "react-redux";
import {clearError} from "../../redux/errorReducer";
import ErrorIcon from '@material-ui/icons/Error';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    icon: {
        marginBottom: theme.spacing(1),
        fontSize: '200px',
    },
}));

const Error = React.memo(({error, clearError}) => {
    const classes = useStyles();

    useEffect(() => {
        return () => {
            clearError()
        }
    });

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{minHeight: '80vh'}}
        >
            <CssBaseline/>
            <ErrorIcon color='primary' className={classes.icon}/>
            <Typography component="h2" variant="h3">
                {error.status}
            </Typography>
            <Typography component="h2" variant="h5">
                {error.name}
            </Typography>
        </Grid>
    );
});

export default compose(connect(null, {clearError}))(Error);