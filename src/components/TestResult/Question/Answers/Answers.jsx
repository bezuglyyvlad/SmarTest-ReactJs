import {memo} from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import {FormGroup} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const useStyles = makeStyles(theme => ({
    checkIcon: {
        color: theme.palette.success.main
    },
    cancelIcon: {
        color: theme.palette.error.main
    },
}));

const Answers = memo(({type, data, user_answer}) => {
    const classes = useStyles();
    let answers = undefined;
    switch (type) {
        case 1:
            answers = <FormControl>
                <RadioGroup name='answers'>
                    {data.map(a => {
                        const radio = user_answer.includes(a.id) ?
                            <Radio checked/> : <Radio/>;
                        return (
                            <Grid container alignItems='center' wrap='nowrap' key={a.id}>
                                {
                                    !!a.is_correct !== user_answer.includes(a.id) && (a.is_correct === 1 ?
                                        <CheckCircleIcon className={classes.checkIcon}/> :
                                        <CancelIcon className={classes.cancelIcon}/>)
                                }
                                <FormControlLabel key={a.id} value={a.id} disabled
                                                  control={radio}
                                                  label={a.text}/>
                            </Grid>
                        )
                    })}
                </RadioGroup>
            </FormControl>
            break;
        case 2:
            answers = <FormGroup>
                {data.map(a => {
                    const ckeckbox = user_answer.includes(a.id) ?
                        <Checkbox checked name="answers"/> : <Checkbox name="answers"/>;
                    return (
                        <Grid container alignItems='center' wrap='nowrap' key={a.id}>
                            {
                                !!a.is_correct !== user_answer.includes(a.id) && (a.is_correct === 1 ?
                                    <CheckCircleIcon className={classes.checkIcon}/> :
                                    <CancelIcon className={classes.cancelIcon}/>)
                            }
                            <FormControlLabel disabled
                                              control={ckeckbox}
                                              label={a.text}/>
                        </Grid>
                    )
                })}
            </FormGroup>
            break;
        default:
            answers = <></>;
    }
    return answers;
});

export default Answers;