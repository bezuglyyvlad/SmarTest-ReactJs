import React from 'react';
import CancelIcon from "@material-ui/icons/Cancel";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Answers from "./Answers/Answers";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2, 2),
        marginBottom: theme.spacing(2)
    },
    checkIcon: {
        color: theme.palette.success.main
    },
    cancelIcon: {
        color: theme.palette.error.main
    },
}));

const Question = React.memo(({q, points}) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Grid
                container
                justify="space-between"
            >
                <Grid item>
                    <Typography variant='subtitle2'>
                        Бали - {`${q.score} из ${points}`}
                    </Typography>
                </Grid>
                <Grid item>
                    {q.right_answer === '1' ?
                        <CheckCircleIcon className={classes.checkIcon}/> :
                        <CancelIcon className={classes.cancelIcon}/>}
                </Grid>
            </Grid>
            <Typography variant='h6'>
                {`${q.number_question}. ${q.text}`}
            </Typography>
            <Answers type={q.type} data={q.answers}/>
            {q.description && <Typography variant='subtitle1'>
                <strong>Пояснення: </strong> {q.description}
            </Typography>}
        </Paper>
    );
});

export default Question;