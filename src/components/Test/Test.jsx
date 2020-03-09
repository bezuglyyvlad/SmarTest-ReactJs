import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import {connect} from "react-redux";
import {testSelectors} from "../../redux/selectors/testSelectors";
import {withRouter} from "react-router";
import {Preloader} from "../common/Preloader";
import {getTest} from "../../redux/testReducer";
import {MobileStepper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    centerFlex: {
        justifyContent: 'center'
    },
    question: {
        fontSize: '18px',
        marginTop: theme.spacing(3),
    },
    form: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    }
}));

const Test = React.memo(({testInfo, question, answers, match, getTest}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);

    const test_id = match.params.test_id;

    console.log(testInfo);
    console.log(question);
    console.log(answers);

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            await getTest(test_id);
            setShowPreloader(false);
        })();
    }, [getTest, test_id]);

    if (showPreloader) return <Preloader/>;

    console.log(showPreloader);

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <MobileStepper steps={20} activeStep={5} position="static" variant="text" className={classes.centerFlex}/>
            <MobileStepper steps={20} activeStep={5} position="static" variant="progress"
                           className={classes.centerFlex}/>
            <Typography className={classes.question}>
                Какие из этих вариантов задают массив из элементов «a», «b»? Какие из этих вариантов задают массив из
                элементов «a», «b»?Какие из этих вариантов задают массив из элементов «a», «b»?Какие из этих вариантов
                задают массив из элементов «a», «b»?
            </Typography>
            <form className={classes.form}>
                <RadioGroup aria-label="answer" name="answer">
                    <FormControlLabel value="female" control={<Radio color="primary"/>} label="Female"/>
                    <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male"/>
                    <FormControlLabel value="other" control={<Radio color="primary"/>} label="Other"/>
                </RadioGroup>
            </form>
        </Container>
    );
});

const mapStateToProps = (state) => ({
    testInfo: testSelectors.getTestInfo(state),
    question: testSelectors.getQuestion(state),
    answers: testSelectors.getAnswers(state),
})

export default compose(withUnAuthRedirect, withRouter, connect(mapStateToProps, {getTest}))(Test);