import {memo} from 'react';
import {makeStyles} from '@mui/styles';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles(theme => ({
    info: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
}));

const TestInfo = memo(({expert_test_name, test_category_name, timer}) => {
    const classes = useStyles();
    return (
        <Grid
            container
            justify="space-between"
        >
            <Grid item md={10} xs={8}>
                <Typography component='h3' className={`${classes.info}`} variant='subtitle1'>
                    {`${expert_test_name} - ${test_category_name}`}
                </Typography>
            </Grid>
            <Grid item md={2} xs={4}>
                <Typography variant='subtitle1' align='right'>
                    {timer}
                </Typography>
            </Grid>
        </Grid>
    );
});

export default TestInfo;