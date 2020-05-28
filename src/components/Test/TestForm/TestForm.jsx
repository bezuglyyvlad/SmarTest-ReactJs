import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {reduxForm} from "redux-form";
import {compose} from "redux";
import {SubmitButton} from "../../common/FormElements";
import Answers from "./Answers/Answers";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    }
}));

const TestForm = React.memo(({handleSubmit, pristine, submitting, data, type}) => {
    const classes = useStyles();
    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <Answers type={type} data={data}/>
            <SubmitButton textButton='Відповісти' disabled={pristine || submitting}/>
        </form>
    );
});

export default compose(reduxForm({
    form: 'test',
}))(TestForm);