import {NavLink} from "react-router-dom";
import {memo, forwardRef, useState} from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {makeStyles, useTheme} from "@mui/styles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import {connect} from "react-redux";
import {changePerPage} from "../../redux/appReducer";
import TablePagination from "@mui/material/TablePagination";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import {PhotoCamera, Delete as DeleteIcon} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import {imageAcceptTypes, useWidth} from "../../utils/utils";
import Image from "material-ui-image";
import Skeleton from "@mui/material/Skeleton";
import queryString from "query-string";

const TablePaginationCreator = memo(({pagination, changePerPage, changePage}) => {
    function setPerPage(event) {
        changePerPage(event.target.value);
    }

    return (
        <TablePagination
            labelRowsPerPage='На сторінку'
            // backIconButtonText='Попередня сторінка'
            // nextIconButtonText='Наступна сторінка'
            rowsPerPageOptions={[5, 10, 20]}
            component='div'
            count={pagination.totalCount}
            rowsPerPage={pagination.perPage}
            page={pagination.currentPage - 1}
            onPageChange={changePage}
            onRowsPerPageChange={setPerPage}
        />
    )
})

export const TablePaginationCreatorWithConnect = connect(null, {changePerPage})(TablePaginationCreator);


const useStylesPagination = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    ul: {
        justifyContent: 'center'
    }
}));

const PaginationCreator = memo(({pagination, mainPath, linkPageName}) => {
    const classes = useStylesPagination();
    return (
        <Pagination classes={{ul: classes.ul, root: classes.root}} count={pagination.last_page} color="primary"
                    page={pagination.current_page} siblingCount={0} renderItem={item => (
            <PaginationItem
                component={NavLink}
                to={`${mainPath}${item.page === 1 ? '' : `${linkPageName}=${item.page}`}`}
                {...item}
            />
        )}/>
    )
})


const useStylesListCreator = makeStyles(theme => ({
    pagination: {
        marginTop: theme.spacing(2),
    }
}));

export const ListCreator = memo(({pagination, dense, setDense, children, mainPath, linkPageName}) => {
    const classes = useStylesListCreator();

    return (
        <>
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
            <Box className={classes.demo} align='center'>
                {children}
                {pagination && pagination.last_page > 1 &&
                <PaginationCreator pagination={pagination} mainPath={mainPath} linkPageName={linkPageName}/>}
            </Box>
        </>
    )
})

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogCreator = memo(({open, handleClose, title, text, confirmButton}) => {
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
                <Button onClick={handleClose}>
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

export const UploadBox = memo(({onUploadChange, image, setImage, visibleDelete, deleteAction}) => {
    const classes = useStylesUpload();
    const [open, setOpen] = useState(false);

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
                        <Button onClick={deleteImage}>
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

const ImageBox = memo(({imageSrc, imageW, imageH}) => {
    const classes = useStylesImageBox();
    const theme = useTheme();
    const width = useWidth();

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
                       loading={<Skeleton animation='pulse' variant='rectangular' width={'inherit'}
                                          height={'inherit'}/>}
                       style={{width: '100%'}} aspectRatio={imageW / imageH}/>
            </Box>
        </Box>
    );
});

export default ImageBox;