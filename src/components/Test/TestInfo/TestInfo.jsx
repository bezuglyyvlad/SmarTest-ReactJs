import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    info: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
}));

const TestInfo = React.memo(({expert_test_name, test_category_name, timer}) => {
    const classes = useStyles();
    return (
        <Grid
            container
            justify="space-between"
        >
            <Grid item md={10} xs={8}>
                <Typography className={`${classes.info}`} variant='h6'>
                    {`${expert_test_name} - ${test_category_name}`}
                </Typography>
            </Grid>
            <Grid item md={2} xs={4}>
                <Typography variant='h6' align='right'>
                    {timer}
                </Typography>
            </Grid>
        </Grid>
    );
});

export default TestInfo;