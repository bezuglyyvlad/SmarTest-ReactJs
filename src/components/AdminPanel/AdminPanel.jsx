import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {withNotAdminRedirect} from "../../hoc/withNotAdminRedirect";
import {getAdminCategories} from "../../redux/adminPanelReducer";
import {Preloader} from "../common/Preloader";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import AdminTable from "./AdminTable/AdminTable";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    table: {
        margin: theme.spacing(2, 0),
    }
}));

const AdminPanel = React.memo(({getAdminCategories}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [errors, setErrors] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            await getAdminCategories();
            setShowPreloader(false);
        })();
    }, [getAdminCategories]);

    if (showPreloader) {
        return <Preloader/>
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function showError(array) {
        setErrors(array);
        setOpen(true);
    }

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Typography component="h1" variant="h5" align='center'>
                Admin панель
            </Typography>
            <Box className={classes.table}>
                <AdminTable showError={showError}/>
            </Box>
            {open && errors &&
            errors.map((e, key) => (
                <Snackbar key={key} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {e}
                    </Alert>
                </Snackbar>
            ))}
        </Container>
    );
});

export default compose(withUnAuthRedirect, withNotAdminRedirect, connect(null, {
    getAdminCategories,
}))(AdminPanel);