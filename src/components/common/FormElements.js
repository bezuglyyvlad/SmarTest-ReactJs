import TextField from "@material-ui/core/TextField";
import React from "react";
import {email, maxLengthCreator, minLengthCreator, required} from "../../utils/validators";
import {Field} from "redux-form";
import Button from "@material-ui/core/Button";

export const renderTextField = ({
                                    label,
                                    input,
                                    meta: {touched, invalid, error},
                                    ...custom
                                }) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)

const minLength2 = minLengthCreator(2);
const minLength6 = minLengthCreator(6);

const maxLength255 = maxLengthCreator(255);

export const usernameField = () => (
    <Field id="username" name='username' component={renderTextField}
           validate={[required, minLength2, maxLength255]}
           label='Имя пользователя'
           variant="outlined"
           margin="normal"
           fullWidth
           required/>
)

export const emailField = () => (
    <Field id="email" name='email' component={renderTextField}
           validate={[required, email]}
           label='Электронная почта'
           variant="outlined"
           margin="normal"
           fullWidth
           required/>
)

export const passwordFirld = () => (
    <Field id="password" name='password' component={renderTextField}
           validate={[required, minLength6, maxLength255]}
           label='Пароль'
           variant='outlined'
           margin='normal'
           type='password'
           fullWidth
           required/>
)

export const submitButton = (textButton, classes, disabled) => (
    <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={disabled}
    >
        {textButton}
    </Button>
)