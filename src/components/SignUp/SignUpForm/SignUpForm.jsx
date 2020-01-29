import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {NavLink} from "react-router-dom";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {reduxForm} from "redux-form";
import {FormHelperText} from "@material-ui/core";
import {
    EmailField,
    PasswordFirld,
    SubmitButton,
    UsernameField,
} from "../../common/FormElements";

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

const SignUpForm = React.memo(({handleSubmit, pristine, submitting, error}) => {
    const classes = useStyles();

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <UsernameField/>
            <EmailField/>
            <PasswordFirld/>
            {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
            <SubmitButton textButton='Зарегистрироваться' disabled={pristine || submitting}/>
            <Grid container justify="flex-end">
                <Grid item>
                    <Link component={NavLink} to='/signin' variant="body2">
                        Уже есть аккаунт? Войти
                    </Link>
                </Grid>
            </Grid>
        </form>
    )
})

export default reduxForm({
    form: 'signup',
})(SignUpForm);