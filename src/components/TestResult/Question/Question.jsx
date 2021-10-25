import { memo } from 'react';
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Answers from "./Answers/Answers";
import ImageBox from "../../common/UIElements";

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

const Question = memo(({q, answers, points}) => {
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
                    {q.right_answer === 1 ?
                        <CheckCircleIcon className={classes.checkIcon}/> :
                        <CancelIcon className={classes.cancelIcon}/>}
                </Grid>
            </Grid>
            <Typography variant='h6'>
                {`${q.number_question}. ${q.text}`}
            </Typography>
            {q.image && <ImageBox imageSrc={q.image}/>}
            <Answers type={q.type} data={answers}/>
            {q.description && <Typography variant='subtitle1'>
                <strong>Пояснення: </strong> {q.description}
            </Typography>}
        </Paper>
    );
});

export default Question;