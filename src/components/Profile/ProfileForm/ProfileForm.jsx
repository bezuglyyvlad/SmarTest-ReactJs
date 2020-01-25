import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {reduxForm} from "redux-form";
import {FormHelperText} from "@material-ui/core";
import {emailField, passwordFirld, submitButton, usernameField} from "../../common/FormElements";

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ProfileForm = React.memo(({handleSubmit, pristine, submitting, error}) => {
    const classes = useStyles();

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            {usernameField()}
            {emailField()}
            {passwordFirld()}
            {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
            {submitButton('Изменить', classes, pristine || submitting)}
        </form>
    )
})

export default reduxForm({
    form: 'profile',
})(ProfileForm);