import { memo } from 'react';
import {makeStyles} from '@mui/styles';
import {compose} from "redux";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import {Paper, TableRow} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import {withRouter} from "react-router";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";

const useStyles = makeStyles(theme => ({
    tableRow: {
        cursor: 'pointer'
    },
    titleTable: {
        padding: '16px 0 0 16px'
    },
}));

const TestsTable = memo(({dense, history, data, indexFirstItem}) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Typography variant='h6' className={classes.titleTable}>
                Тести
            </Typography>
            <Table
                size={dense ? 'small' : 'medium'}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Назва</TableCell>
                        <TableCell>Категорія</TableCell>
                        <TableCell>Бали</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((t, index) => (
                        <TableRow key={t.test_id} hover onClick={() => history.push(`/test/${t.test_id}/result`)}
                                  className={classes.tableRow}>
                            <TableCell>{indexFirstItem-index}</TableCell>
                            <TableCell>{t.subcategory_name}</TableCell>
                            <TableCell>{t.category_name}</TableCell>
                            <TableCell>{t.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default compose(withRouter)(TestsTable);