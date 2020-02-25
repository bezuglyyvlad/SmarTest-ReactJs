import {NavLink} from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles} from "@material-ui/core/styles";
import {changePerPage} from "../../redux/appReducer";
import {connect} from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

const TablePaginationCreator = React.memo(({pagination, mainPath, changePerPage}) => {
    function setPerPage(event) {
        changePerPage(event.target.value);
    }

    return (
        <TablePagination
            backIconButtonProps={{
                component: NavLink,
                to: pagination.currentPage !== 2 ? `?page=${pagination.currentPage - 1}` : mainPath
            }}
            nextIconButtonProps={{component: NavLink, to: `?page=${pagination.currentPage + 1}`}}
            labelRowsPerPage='Строк на страницу'
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={pagination.totalCount}
            rowsPerPage={pagination.perPage}
            page={pagination.currentPage - 1}
            onChangePage={() => {
            }}
            onChangeRowsPerPage={setPerPage}
        />
    )
})

const TablePaginationCreatorWithConnect = connect(null, {changePerPage})(TablePaginationCreator);


const useStylesPagination = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
    ul: {
        justifyContent: 'center'
    }
}));

const PaginationCreator = React.memo(({pagination, mainPath}) => {
    const classes = useStylesPagination();
    return (
        <Pagination classes={{ul: classes.ul, root: classes.root}} count={pagination.pageCount} color="primary"
                    page={pagination.currentPage} siblingCount={0} renderItem={item => (
            <PaginationItem
                component={NavLink}
                to={`${mainPath}${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
            />
        )}/>
    )
})


const useStylesListCreator = makeStyles(theme => ({
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    pagination: {
        marginTop: theme.spacing(2),
    }
}));

export const ListCreator = React.memo(({pagination, dense, setDense, children, mainPath}) => {
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
                <PaginationCreator pagination={pagination} mainPath={mainPath}/>}
            </div>
        </div>
    )
})