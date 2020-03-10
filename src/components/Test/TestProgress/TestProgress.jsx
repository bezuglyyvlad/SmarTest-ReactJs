import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {MobileStepper} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
    },
    title: {
        fontSize: '16px',
        textAlign: 'center'
    },
    progress: {
        justifyContent: 'center'
    },
}));

const TestProgress = React.memo(({number_question, count_of_question}) => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Typography className={classes.title}>
                Вопрос {number_question}/{count_of_question}
            </Typography>
            <MobileStepper steps={count_of_question} activeStep={number_question - 1}
                           position="static" variant="progress"
                           className={classes.progress}/>
        </Box>
    );
});

export default TestProgress;