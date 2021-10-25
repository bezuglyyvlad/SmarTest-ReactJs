import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {withNotAdminRedirect} from "../../hoc/withNotAdminRedirect";
import {getAdminTestCategories} from "../../redux/adminPanelReducer";
import {Preloader} from "../common/Preloader";
import Box from "@material-ui/core/Box";
import AdminTable from "./AdminPanelTable/AdminPanelTable";
import {useSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
    },
    table: {
        marginTop: theme.spacing(2),
    }
}));

const AdminPanel = React.memo(({getAdminTestCategories}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        let mounted = true; // exclude memory leak
        (async () => {
            setShowPreloader(true);
            await getAdminTestCategories();
            mounted && setShowPreloader(false);
        })();
        return () => mounted = false;
    }, [getAdminTestCategories]);

    if (showPreloader) {
        return <Preloader/>
    }

    function showError(array) {
        array.forEach(item => {
            enqueueSnackbar(item, {variant: "error"})
        });
    }

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Typography component="h1" variant="h5" align='center'>
                Admin панель
            </Typography>
            <Box className={classes.table}>
                <AdminTable showError={showError}/>
            </Box>
        </Container>
    );
});

export default compose(withUnAuthRedirect, withNotAdminRedirect, connect(null, {
    getAdminTestCategories,
}))(AdminPanel);