import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {Preloader} from "../common/Preloader";
import {withNotExpertRedirect} from "../../hoc/withNotExpertRedirect";
import Link from "@material-ui/core/Link";
import {NavLink} from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {materialTableLocalization} from "../../utils/localization";
import MaterialTable from "material-table";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    title: {
        margin: theme.spacing(2, 0),
    },
    tableRow: {
        backgroundColor: "aqua",
    }
}));

const ExpertTests = React.memo(({}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            // запрос на сервер
            setShowPreloader(false);
        })();
    }, []);

    if (showPreloader) {
        return <Preloader/>
    }


    const columns = [
        {title: 'Id', field: 'subcategory_id', editable: 'never'},
        {title: 'Назва', field: 'name'},
        {title: 'Час', field: 'time'},
        {title: 'Кількість питань', field: 'count_of_questions'},
        {title: 'Доступ', field: 'is_open', lookup: {0: 'Закритий', 1: 'Відкритий'}},
    ];

    const subcategories = [
        {subcategory_id: 1, name: 'Name 1', time: 1, count_of_questions: 10, is_open: 1}
    ];

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" component={NavLink} to='/expertPanel'>
                    Expert панель
                </Link>
                <Typography color="textPrimary">Назва категорії</Typography>
            </Breadcrumbs>
            <Typography component="h1" variant="h5" align='center' className={classes.title}>
                Тести
            </Typography>
            <MaterialTable
                title="Тести"
                columns={columns}
                data={subcategories}
                options={{sorting: true}}
                localization={materialTableLocalization}
            />
        </Container>
    );
});

export default compose(withUnAuthRedirect, withNotExpertRedirect, connect(null, {}))(ExpertTests);