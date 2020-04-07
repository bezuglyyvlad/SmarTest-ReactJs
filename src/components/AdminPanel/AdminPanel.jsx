import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {withNotAdminRedirect} from "../../hoc/withNotAdminRedirect";
import MaterialTable from 'material-table';
import {getAdminCategories} from "../../redux/adminPanelReducer";
import {adminPanelSelectors} from "../../redux/selectors/adminPanelSelectors";
import {Preloader} from "../common/Preloader";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    title: {
        marginBottom: theme.spacing(2),
    }
}));

const AdminPanel = React.memo(({getAdminCategories, categories}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);

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

    const columns = [
        {title: 'Id', field: 'category_id', editable: 'never'},
        {title: 'Название', field: 'name'},
        {title: 'Электронная почта (Эксперта)', field: 'user.email'},
    ];

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Typography component="h1" variant="h5" align='center' className={classes.title}>
                Admin панель
            </Typography>
            <MaterialTable
                title="Категории"
                columns={columns}
                data={categories.categories}
                options={{sorting: true}}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            console.log({name: newData.name, userEmail: newData.user.email});
                            resolve();
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            console.log(newData);
                            console.log(oldData);
                            resolve();
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            console.log(oldData);
                            resolve();
                        })
                }}
            />
        </Container>
    );
});

const mapStateToProps = (state) => ({
    categories: adminPanelSelectors.getCategories(state),
})

export default compose(withUnAuthRedirect, withNotAdminRedirect, connect(mapStateToProps, {getAdminCategories}))(AdminPanel);