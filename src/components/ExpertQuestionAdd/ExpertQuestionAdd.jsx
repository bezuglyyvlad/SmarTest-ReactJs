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
import {NavLink, Redirect} from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {withRouter} from "react-router";
import {categorySelectors} from "../../redux/selectors/categorySelectors";
import {subcategorySelectors} from "../../redux/selectors/subcategorySelectors";
import {getCategory} from "../../redux/categoryReducer";
import {getSubcategory} from "../../redux/subcategoryReducer";
import Box from "@material-ui/core/Box";
import ExpertAnswerAddTable from "./ExpertAnswerAddTable/ExpertAnswerAddTable";
import {addQuestion} from "../../redux/expertQuestionsReducer";
import ExpertQuestionForm from "../common/ExpertQuestionForm/ExpertQuestionForm";
import {uploadImageQuestionValidate} from "../../utils/validators";
import {getFormData, imageAcceptTypes} from "../../utils/utils";
import {UploadBox} from "../common/UIElements";
import {useSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
    },
    table: {
        marginTop: theme.spacing(2),
    },
}));

const ExpertQuestionAdd = React.memo(({
                                          match, getCategory, getSubcategory,
                                          categoryName, subcategoryName, addQuestion
                                      }) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [answers, setAnswers] = React.useState([]);
    const [image, setImage] = React.useState('');
    const {enqueueSnackbar} = useSnackbar();
    const [added, setAdded] = React.useState(false);

    const category_id = match.params.category_id;
    const subcategory_id = match.params.subcategory_id;

    useEffect(() => {
        let mounted = true; // exclude memory leak
        (async () => {
            setShowPreloader(true);
            await getCategory(category_id);
            await getSubcategory(subcategory_id);
            mounted && setShowPreloader(false);
        })();
        return () => mounted = false;
    }, [category_id, getCategory, getSubcategory, subcategory_id]);

    if (showPreloader) {
        return <Preloader/>
    }

    if (added) {
        return <Redirect to={`/expertPanel/${category_id}/${subcategory_id}`}/>
    }

    function showError(array) {
        array.forEach(item => {
            enqueueSnackbar(item, {variant: "error"})
        });
    }

    const onSubmit = (data) => {
        let errors = [];
        answers.length < 2 && errors.push('Кількість відповідей не може бути менше 2.');
        answers.filter(i => i.is_right === '1').length === 0 && errors.push('Хоча б одна відповідь повинна бути вірною.');
        if (errors.length !== 0) {
            showError(errors);
        } else {
            answers.map(i => (delete i.tableData));
            const dataObject = {...data, image, subcategory_id, answers};
            const formData = new FormData();
            getFormData(formData, dataObject);
            addQuestion(formData);
            setAdded(true);
        }
    }

    const onUploadChange = (e) => {
        const files = e.target.files;
        if (files.length && uploadImageQuestionValidate(files[0], imageAcceptTypes, showError)) {
            setImage(files[0]);
        }
    }

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" component={NavLink} to='/expertPanel'>
                    Expert панель
                </Link>
                <Link color="inherit" component={NavLink} to={`/expertPanel/${category_id}`}>
                    {categoryName}
                </Link>
                <Link color="inherit" component={NavLink} to={`/expertPanel/${category_id}/${subcategory_id}`}>
                    {subcategoryName}
                </Link>
                <Typography color="textPrimary">Створення питання</Typography>
            </Breadcrumbs>
            <Container component='main'>
                <UploadBox onUploadChange={onUploadChange} image={image} setImage={setImage}/>
                <ExpertQuestionForm onSubmit={onSubmit} initialValues={{lvl: 1, type: 1}}/>
                <Box className={classes.table}>
                    <ExpertAnswerAddTable answers={answers} setAnswers={setAnswers}/>
                </Box>
            </Container>
        </Container>
    );
});

const mapStateToProps = (state) => ({
    categoryName: categorySelectors.getName(state),
    subcategoryName: subcategorySelectors.getName(state),
});

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {
    getCategory,
    getSubcategory,
    addQuestion
}))(ExpertQuestionAdd);