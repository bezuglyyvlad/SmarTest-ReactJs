import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {NavLink} from "react-router-dom";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Field, reduxForm} from "redux-form";
import {email, maxLengthCreator, minLengthCreator, required} from "../../../utils/validators";
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

const minLength2 = minLengthCreator(2);
const minLength6 = minLengthCreator(6);

const maxLength255 = maxLengthCreator(255);

const SignUpForm = React.memo(({handleSubmit, pristine, submitting, error, submitSucceeded}) => {
    const classes = useStyles();

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Field id="username" name='username' component={renderTextField}
                   validate={[required, minLength2, maxLength255]}
                   label='Имя пользователя'
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   required/>
            <Field id="email" name='email' component={renderTextField}
                   validate={[required, email]}
                   label='Электронная почта'
                   variant="outlined"
                   margin="normal"
                   fullWidth
                   required/>
            <Field id="password" name='password' component={renderTextField}
                   validate={[required, minLength6, maxLength255]}
                   label='Пароль'
                   variant='outlined'
                   margin='normal'
                   type='password'
                   fullWidth
                   required/>
            {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={pristine || submitting || submitSucceeded}
            >
                Зарегистрироваться
            </Button>
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