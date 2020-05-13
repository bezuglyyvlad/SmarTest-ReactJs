import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {reduxForm} from "redux-form";
import {FormHelperText} from "@material-ui/core";
import {
    SelectField,
    SubmitButton, TextareaField,
} from "../../common/FormElements";
import MenuItem from "@material-ui/core/MenuItem";
import {required} from "../../../utils/validators";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
}));

const QuestionAddForm = React.memo(({handleSubmit, pristine, submitting, error}) => {
    const classes = useStyles();

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextareaField label='Текст' name='text' validators={[required]}/>
            <TextareaField label='Опис' name='description'/>
            <SelectField name='lvl' label='Складність'>
                <MenuItem value={1}>Легкий</MenuItem>
                <MenuItem value={2}>Середній</MenuItem>
                <MenuItem value={3}>Складний</MenuItem>
            </SelectField>
            <SelectField name='type' label='Тип'>
                <MenuItem value={1}>Одиночний</MenuItem>
                <MenuItem value={2}>Множинний</MenuItem>
            </SelectField>
            {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
            <SubmitButton textButton='Зберегти' disabled={pristine || submitting}/>
        </form>
    )
})

export default reduxForm({
    form: 'questionAdd',
})(QuestionAddForm);