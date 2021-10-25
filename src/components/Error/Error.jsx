import { memo } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from "@mui/material/Typography";
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import {NavLink} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';

const useStyles = makeStyles(theme => ({
    icon: {
        marginBottom: theme.spacing(1),
        fontSize: '200px',
    },
    button: {
        marginTop: theme.spacing(10),
    }
}));

const Error = memo(({error}) => {
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