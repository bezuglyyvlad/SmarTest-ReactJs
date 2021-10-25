import { memo } from 'react';
import {makeStyles} from '@mui/styles';
import Typography from "@mui/material/Typography";
import {MobileStepper} from "@mui/material";
import Box from "@mui/material/Box";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
    },
    progress: {
        justifyContent: 'center'
    },
}));

const TestProgress = memo(({number_question, count_of_questions}) => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Typography align='center' variant='subtitle1'>
                Питання {number_question}/{count_of_questions}
            </Typography>
            <MobileStepper steps={count_of_questions} activeStep={number_question - 1}
                           position="static" variant="progress"
                           className={classes.progress}/>
        </Box>
    );
});

export default TestProgress;