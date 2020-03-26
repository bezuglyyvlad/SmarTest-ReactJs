import React from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import {FormGroup} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import CancelIcon from "@material-ui/icons/Cancel";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles(theme => ({
    checkIcon: {
        color: theme.palette.success.main
    },
    cancelIcon: {
        color: theme.palette.error.main
    },
}));

const Answers = React.memo(({type, data}) => {
    const classes = useStyles();
    let answers = undefined;
    console.log(data);
    switch (type) {
        case '1':
            answers = <FormControl>
                <RadioGroup name='answers'>
                    {data.map(a => {
                        const radio = a.is_user_answer === 1 ?
                            <Radio checked/> : <Radio/>;
                        return a.is_right === a.is_user_answer ?
                            <FormControlLabel key={a.test_answer_id} value={a.text} disabled
                                              control={radio}
                                              label={a.text}/> :
                            <Grid container alignItems='center' key={a.test_answer_id}>
                                {a.is_right === 1 ? <CheckCircleIcon className={classes.checkIcon}/> :
                                    <CancelIcon className={classes.cancelIcon}/>}<FormControlLabel value={a.text}
                                                                                                   disabled
                                                                                                   control={radio}
                                                                                                   label={a.text}/>
                            </Grid>
                    })}
                </RadioGroup>
            </FormControl>
            break;
        case '2':
            answers = <FormGroup>
                {data.map(a => {
                    const ckeckbox = a.is_user_answer === 1 ?
                        <Checkbox checked name="answers"/> : <Checkbox name="answers"/>;
                    return a.is_right === a.is_user_answer ?
                        <FormControlLabel key={a.test_answer_id} disabled control={ckeckbox} label={a.text}/> :
                        <Grid container alignItems='center' key={a.test_answer_id}>
                            {a.is_right === 1 ? <CheckCircleIcon className={classes.checkIcon}/> :
                                <CancelIcon className={classes.cancelIcon}/>}<FormControlLabel disabled
                                                                                               control={ckeckbox}
                                                                                               label={a.text}/>
                        </Grid>
                })}
            </FormGroup>
            break;
        default:
            answers = <></>;
    }
    return answers;
});

export default Answers;