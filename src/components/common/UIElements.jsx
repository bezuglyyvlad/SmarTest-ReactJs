import {NavLink} from "react-router-dom";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles, useTheme} from "@material-ui/core/styles";
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
import IconButton from "@material-ui/core/IconButton";
import {PhotoCamera, Delete as DeleteIcon} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import {imageAcceptTypes} from "../../utils/utils";
import Image from "material-ui-image";
import Skeleton from "@material-ui/lab/Skeleton";
import {withWidth} from "@material-ui/core";
import queryString from "query-string";

const TablePaginationCreator = React.memo(({pagination, changePerPage, changePage}) => {
    function setPerPage(event) {
        changePerPage(event.target.value);
    }

    return (
        <TablePagination
            labelRowsPerPage='На сторінку'
            backIconButtonText='Попередня сторінка'
            nextIconButtonText='Наступна сторінка'
            rowsPerPageOptions={[5, 10, 20]}
            component='div'
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
                        value='dense'
                        color='primary'
                    />
                }
                label='Зробити компактніше'
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
                    Ні
                </Button>
                {confirmButton}
            </DialogActions>
        </Dialog>
    )
})

export function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStylesUpload = makeStyles(theme => ({
    uploadBox: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: "center",
        flexDirection: "column"
    },
    input: {
        display: 'none'
    },
    uploadSubtitle: {
        display: "flex",
        flexDirection: "row"
    },
    clearButton: {
        margin: theme.spacing(0, 1),
    }
}));

export const UploadBox = React.memo(({onUploadChange, image, setImage, visibleDelete, deleteAction}) => {
    const classes = useStylesUpload();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
    };

    const deleteImage = () => {
        handleClose();
        deleteAction();
    }

    return (
        <Box className={classes.uploadBox}>
            <Box>
                <input accept={imageAcceptTypes} className={classes.input} id="image" type="file"
                       onChange={onUploadChange}/>
                <label htmlFor="image">
                    <IconButton color="primary" aria-label="upload image" component="span">
                        <PhotoCamera fontSize='large'/>
                    </IconButton>
                </label>
                {visibleDelete && <>
                    <IconButton aria-label="delete" className={classes.margin}
                                onClick={handleClickOpen}>
                        <DeleteIcon color="error" fontSize="large"/>
                    </IconButton>
                    <DialogCreator open={open} handleClose={handleClose} title='Видалення зображення'
                                   text='Ви дійсно хочете видалити зображення?' confirmButton={
                        <Button onClick={deleteImage} color="primary">
                            Так
                        </Button>}/>
                </>
                }
            </Box>
            {image && <Box className={classes.uploadSubtitle}>
                <Typography variant='subtitle1'>
                    {image.name}
                </Typography>
                <IconButton aria-label="delete" size='small' className={classes.clearButton} onClick={() => {
                    setImage(null)
                }}>
                    <ClearIcon fontSize='inherit'/>
                </IconButton>
            </Box>}
        </Box>
    )
});


const useStylesImageBox = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: 'center',
        margin: theme.spacing(2, 0),
    }
}));

const ImageBox = React.memo(({imageSrc, width, imageW, imageH}) => {
    const classes = useStylesImageBox();
    const theme = useTheme();

    if (!(imageW && imageH)) {
        const imageSize = queryString.parseUrl(imageSrc).query;
        imageW = +imageSize.w;
        imageH = +imageSize.h;
    }

    return (
        <Box className={classes.root}>
            <Box style={{width: imageW > (theme.breakpoints.values[width] || 320) ? '100%' : imageW}}>
                <Image color={theme.palette.background.default} animationDuration={2000}
                       src={imageSrc}
                       loading={<Skeleton animation='pulse' variant='rect' width={'inherit'}
                                          height={'inherit'}/>}
                       style={{width: '100%'}} aspectRatio={imageW / imageH}/>
            </Box>
        </Box>
    );
});

export default withWidth()(ImageBox);