import TextField from "@material-ui/core/TextField";
import React from "react";
import {email, fieldMatch, maxLengthCreator, minLengthCreator, required} from "../../utils/validators";
import {Field} from "redux-form";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";

const renderTextField = React.memo(({
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
))


const renderFromHelper = ({touched, error}) => {
    if (touched && error) {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

const useStylesSelect = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(2),
    },
}));

const renderSelectField = React.memo(({
                                          input,
                                          label,
                                          meta: {touched, error},
                                          children,
                                          ...custom
                                      }) => {
    const classes = useStylesSelect();

    return (
        <FormControl error={touched && error} fullWidth className={classes.formControl}>
            <InputLabel>{label}</InputLabel>
            <Select
                {...input}
                {...custom}
            >
                {children}
            </Select>
            {renderFromHelper({touched, error})}
        </FormControl>)
})

const minLength2 = minLengthCreator(2);
const minLength6 = minLengthCreator(6);

const maxLength255 = maxLengthCreator(255);

export const NameField = React.memo(() => (
    <Field id="name" name='name' component={renderTextField}
           validate={[required, minLength2, maxLength255]}
           label='Ім`я користувача'
           variant="outlined"
           margin="normal"
           fullWidth/>
))

export const EmailField = React.memo(() => (
    <Field id="email" name='email' component={renderTextField}
           validate={[required, email]}
           label='Електронна пошта'
           variant="outlined"
           margin="normal"
           fullWidth/>
))

export const PasswordField = React.memo(({labelText}) => (
    <Field id='password' name='password' component={renderTextField}
           validate={[required, minLength6, maxLength255]}
           label={labelText}
           variant='outlined'
           margin='normal'
           type='password'
           fullWidth/>
))

export const PasswordConfirmationField = React.memo(({labelText}) => (
    <Field id='password_confirmation' name='password_confirmation' component={renderTextField}
           validate={[required, minLength6, maxLength255, fieldMatch('password')]}
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

export const TextareaField = React.memo(({label, name, validators}) => (
    <Field
        name={name}
        component={renderTextField}
        validate={validators}
        label={label}
        multiline
        rowsMax="10"
        margin="normal"
        fullWidth
    />
))

export const SelectField = React.memo(({children, name, label}) => (
    <Field
        name={name}
        component={renderSelectField}
        label={label}
    >
        {children}
    </Field>
))

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