import {memo} from 'react';
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Answers from "./Answers/Answers";
import ImageBox from "../../common/UIElements";
import {roundToTwo} from "../../../utils/utils";

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

const Question = memo(({q, answers, points, correctionCoef}) => {
    const classes = useStyles();

    const maxQuestionPoints = roundToTwo(points * q.question.quality_coef * correctionCoef);
    const score = roundToTwo(q.score * correctionCoef);

    return (
        <Paper className={classes.paper}>
            <Grid
                container
                justifyContent="space-between"
            >
                <Grid item>
                    <Typography variant='subtitle2'>
                        Бали - {`${score > maxQuestionPoints ? maxQuestionPoints : score} из ${maxQuestionPoints}`}
                    </Typography>
                </Grid>
                <Grid item>
                    {q.is_correct_answer === 1 ?
                        <CheckCircleIcon className={classes.checkIcon}/> :
                        <CancelIcon className={classes.cancelIcon}/>}
                </Grid>
            </Grid>
            <Typography variant='h6'>
                {`${q.serial_number}. ${q.question.text}`}
            </Typography>
            {q.question.image && <ImageBox imageSrc={q.question.image}/>}
            <Answers type={q.question.type}
                     data={answers}
                     user_answer={q.user_answer}/>
            {q.question.description && <Typography variant='subtitle1'>
                <strong>Пояснення: </strong> {q.question.description}
            </Typography>}
        </Paper>
    );
});

export default Question;