import {NavLink} from "react-router-dom";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import {connect} from "react-redux";
import {changePerPage} from "../../redux/appReducer";
import TablePagination from "@material-ui/core/TablePagination";
import MuiAlert from "@material-ui/lab/Alert";

const TablePaginationCreator = React.memo(({pagination, changePerPage, changePage}) => {
    function setPerPage(event) {
        changePerPage(event.target.value);
    }

    return (
        <TablePagination
            labelRowsPerPage='На страницу'
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={pagination.totalCount}
            rowsPerPage={pagination.perPage}
            page={pagination.currentPage - 1}
            onChangePage={changePage}
            onChangeRowsPerPage={setPerPage}
        />
    )
})

export const TablePaginationCreatorWithConnect = connect(null, {changePerPage})(TablePaginationCreator);


const useStylesPagination = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingBottom: theme.spacing(2)
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogCreator = React.memo(({open, handleClose, title, text, confirmButton}) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Нет
                </Button>
                {confirmButton}
            </DialogActions>
        </Dialog>
    )
})

export function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}