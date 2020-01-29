import {NavLink} from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles} from "@material-ui/core/styles";

export const TablePaginationCreator = React.memo(({pagination, mainPath}) => {
    return (
        <TablePagination
            backIconButtonProps={{
                component: NavLink,
                to: pagination.currentPage !== 2 ? `?page=${pagination.currentPage - 1}` : mainPath
            }}
            nextIconButtonProps={{component: NavLink, to: `?page=${pagination.currentPage + 1}`}}
            labelRowsPerPage={false}
            rowsPerPageOptions={[]}
            component="div"
            count={pagination.totalCount}
            rowsPerPage={pagination.perPage}
            page={pagination.currentPage - 1}
            onChangePage={() => {
            }}
        />
    )
})


const useStylesListCreator = makeStyles(theme => ({
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export const ListCreator = React.memo(({pagination, dense, setDense, children}) => {
    const classes = useStylesListCreator();

    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={dense}
                        onChange={event => setDense(event.target.checked)}
                        value="dense"
                        color="primary"
                    />
                }
                label="Сделать компактнее"
            />
            <div className={classes.demo} align='center'>
                {children}
                {pagination && pagination.pageCount > 1 &&
                <TablePaginationCreator pagination={pagination} mainPath='/category'/>}
            </div>
        </div>
    )
})