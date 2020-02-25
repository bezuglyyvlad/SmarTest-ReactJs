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
} from "../../common/FormElements";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
}));

const SignInForm = React.memo(({handleSubmit, pristine, submitting, error}) => {
    const classes = useStyles();

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <EmailField/>
            <PasswordFirld/>
            {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
            <SubmitButton textButton='Войти' disabled={pristine || submitting}/>
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