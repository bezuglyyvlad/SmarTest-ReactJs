import TextField from "@material-ui/core/TextField";
import React from "react";
import {email, maxLengthCreator, minLengthCreator, required} from "../../utils/validators";
import {Field} from "redux-form";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const RenderTextField = ({
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

export const UsernameField = React.memo(() => (
    <Field id="username" name='username' component={RenderTextField}
           validate={[required, minLength2, maxLength255]}
           label='Имя пользователя'
           variant="outlined"
           margin="normal"
           fullWidth/>
))

export const EmailField = React.memo(() => (
    <Field id="email" name='email' component={RenderTextField}
           validate={[required, email]}
           label='Электронная почта'
           variant="outlined"
           margin="normal"
           fullWidth/>
))

export const PasswordField = React.memo(({labelText}) => (
    <Field id="password" name='password' component={RenderTextField}
           validate={[required, minLength6, maxLength255]}
           label={labelText}
           variant='outlined'
           margin='normal'
           type='password'
           fullWidth/>
))

const useStylesSubmitButton = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const SubmitButton = React.memo(({textButton, disabled}) => {
    const classes = useStylesSubmitButton();

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
        >
            {textButton}
        </Button>)
})

export const radioButtons = ({input, ...rest}) => (
    <FormControl>
        <RadioGroup {...input} {...rest}>
            {rest.children}
        </RadioGroup>
    </FormControl>
)

export const renderCheckbox = ({input, label}) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox color='primary'
                          checked={input.value ? true : false}
                          onChange={input.onChange}/>
            }
            label={label}
        />
    </div>
)