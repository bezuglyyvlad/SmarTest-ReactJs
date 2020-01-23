import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {NavLink} from "react-router-dom";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Field, reduxForm} from "redux-form";
import {email, required} from "../../../utils/validators";
import {FormHelperText} from "@material-ui/core";
import {renderTextField} from "../../common/FormElements";

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignInForm = React.memo(({handleSubmit, pristine, submitting, error, ...props}) => {
    const classes = useStyles();

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Field id="email" name='email' component={renderTextField}
                   validate={[required, email]}
                   label='Электронная почта'
                   autoFocus
                   variant="outlined"
                   margin="normal"
                   fullWidth/>
            <Field id="password" name='password' component={renderTextField}
                   validate={[required]}
                   label='Пароль'
                   variant='outlined'
                   margin='normal'
                   type='password'
                   fullWidth/>
            {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={pristine || submitting || props.submitSucceeded}
            >
                Войти
            </Button>
            <Grid container>
                <Grid item xs>
                    {/*<Link href="#" variant="body2">*/}
                    {/*    Forgot password?*/}
                    {/*</Link>*/}
                </Grid>
                <Grid item>
                    <Link component={NavLink} to='/signup' variant="body2">
                        {'У вас нет аккаунта? Зарегистрироваться'}
                    </Link>
                </Grid>
            </Grid>
        </form>
    )
})

export default reduxForm({
    form: 'signin',
})(SignInForm);