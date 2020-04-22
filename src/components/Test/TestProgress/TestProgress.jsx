import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {MobileStepper} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
    },
    progress: {
        justifyContent: 'center'
    },
}));

const TestProgress = React.memo(({number_question, count_of_questions}) => {
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