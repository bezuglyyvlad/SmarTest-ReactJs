import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {NavLink} from "react-router-dom";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {reduxForm} from "redux-form";
import {FormHelperText} from "@material-ui/core";
import {emailField, passwordFirld, submitButton} from "../../common/FormElements";

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignInForm = React.memo(({handleSubmit, pristine, submitting, error}) => {
    const classes = useStyles();

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            {emailField()}
            {passwordFirld()}
            {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
            {submitButton('Войти', classes, pristine || submitting)}
            <Grid container justify="flex-end">
                <Grid item>
                    <Link component={NavLink} to='/signup' variant="body2">
                        У вас нет аккаунта? Зарегистрироваться
                    </Link>
                </Grid>
            </Grid>
        </form>
    )
})

export default reduxForm({
    form: 'signin',
})(SignInForm);