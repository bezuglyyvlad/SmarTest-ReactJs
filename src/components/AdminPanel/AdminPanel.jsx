import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {withNotAdminRedirect} from "../../hoc/withNotAdminRedirect";
import MaterialTable from 'material-table';
import {getAdminCategories, updateCategory} from "../../redux/adminPanelReducer";
import {adminPanelSelectors} from "../../redux/selectors/adminPanelSelectors";
import {Preloader} from "../common/Preloader";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import {required} from "../../utils/validators";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    table: {
        margin: theme.spacing(2, 0),
    }
}));

const AdminPanel = React.memo(({getAdminCategories, categories, updateCategory}) => {
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

    const columns = [
        {title: 'Id', field: 'category_id', editable: 'never'},
        {title: 'Название*', field: 'name'},
        {title: 'Электронная почта (Эксперта)', field: 'user.email'},
    ];

    function showError(array) {
        setErrors(array);
        setOpen(true);
    }

    function validateName(name) {
        const requiredError = required(name);
        if (requiredError) {
            showError(["Название обязательно для заполнения."]);
            return false;
        }
        return true;
    }

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Typography component="h1" variant="h5" align='center'>
                Admin панель
            </Typography>
            <Box className={classes.table}>
                <MaterialTable
                    title="Категории"
                    columns={columns}
                    data={categories.categories}
                    options={{sorting: true}}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                if (!validateName(newData.name)) {
                                    reject();
                                } else {
                                    //сделать запрос на сервер
                                }
                                console.log({name: newData.name, userEmail: newData.user.email});
                                resolve();
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(async (resolve, reject) => {
                                if (!validateName(newData.name)) {
                                    reject();
                                } else {
                                    let myOldData = {...oldData};
                                    delete myOldData.tableData;
                                    if (JSON.stringify(newData) !== JSON.stringify(myOldData)) {
                                        const {category_id, name, userEmail} = {
                                            category_id: newData.category_id,
                                            name: newData.name,
                                            userEmail: newData.user ? newData.user.email : null,
                                        };
                                        const apiErrors = await updateCategory(category_id, name, userEmail);
                                        if (apiErrors) {
                                            console.log(apiErrors);
                                            showError(apiErrors);
                                            reject();
                                        }
                                    }
                                }
                                resolve();
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                console.log(oldData);
                                resolve();
                            })
                    }}
                />
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

const mapStateToProps = (state) => ({
    categories: adminPanelSelectors.getCategories(state),
})

export default compose(withUnAuthRedirect, withNotAdminRedirect, connect(mapStateToProps, {
    getAdminCategories,
    updateCategory
}))(AdminPanel);