import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles(theme => ({
    icon: {
        marginBottom: theme.spacing(1),
        fontSize: '200px',
    },
}));

const Error = React.memo(({error}) => {
    const classes = useStyles();

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
            <Typography variant="h3">
                {error.status}
            </Typography>
            <Typography variant="h5">
                {error.name}
            </Typography>
        </Grid>
    );
});

export default Error;