import { memo } from 'react';
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

const Answers = memo(({type, data}) => {
    const classes = useStyles();
    let answers = undefined;
    switch (type) {
        case 1:
            answers = <FormControl>
                <RadioGroup name='answers'>
                    {data.map(a => {
                        const radio = a.is_user_answer === 1 ?
                            <Radio checked/> : <Radio/>;
                        return a.is_right === a.is_user_answer ?
                            <FormControlLabel key={a.test_answer_id} value={a.test_answer_id} disabled
                                              control={radio}
                                              label={a.text}/> :
                            <Grid container alignItems='center' wrap='nowrap' key={a.test_answer_id}>
                                {a.is_right === 1 ? <CheckCircleIcon className={classes.checkIcon}/> :
                                    <CancelIcon className={classes.cancelIcon}/>}<FormControlLabel
                                value={a.test_answer_id}
                                disabled
                                control={radio}
                                label={a.text}/>
                            </Grid>
                    })}
                </RadioGroup>
            </FormControl>
            break;
        case 2:
            answers = <FormGroup>
                {data.map(a => {
                    const ckeckbox = a.is_user_answer === 1 ?
                        <Checkbox checked name="answers"/> : <Checkbox name="answers"/>;
                    return a.is_right === a.is_user_answer ?
                        <FormControlLabel key={a.test_answer_id} disabled control={ckeckbox} label={a.text}/> :
                        <Grid container alignItems='center' wrap='nowrap' key={a.test_answer_id}>
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