import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Line} from "react-chartjs-2";
import {useTheme} from "@material-ui/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    chart: {
        margin: theme.spacing(0, 0, 3),
    },
}));

const Chart = React.memo(({data}) => {
    const theme = useTheme();
    const classes = useStyles();

    const chartData = {
        labels: Array.from({length: data.length}, (v, k) => k + 1),
        datasets: [
            {
                label: 'Баллы',
                fill: true,
                borderColor: theme.palette.primary.main,
                data: data
            }
        ]
    }

    return (
        <Box className={classes.chart}>
            <Line
                data={chartData}
                options={{
                    title: {
                        display: true,
                        text: 'Баллы за последних 30 дней',
                        fontSize: 16
                    },
                    legend: {
                        display: false,
                    }
                }}
                height={200}
            />
        </Box>
    );
});

export default Chart;