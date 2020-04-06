import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import {NavLink} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
    icon: {
        marginBottom: theme.spacing(1),
        fontSize: '200px',
    },
    button: {
        marginTop: theme.spacing(10),
    }
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
            style={{minHeight: '85vh'}}
        >
            <CssBaseline/>
            <ErrorIcon color='primary' className={classes.icon}/>
            <Typography variant="h3">
                {error.status}
            </Typography>
            <Typography variant="h5">
                {error.name}
            </Typography>
            <IconButton component={NavLink} to='/' color="primary" aria-label="Домой" className={classes.button}>
                <HomeIcon fontSize='large'/>
            </IconButton>
        </Grid>
    );
});

export default Error;