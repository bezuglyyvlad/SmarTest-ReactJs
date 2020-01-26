import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import Slide from "@material-ui/core/Slide";
import Link from "@material-ui/core/Link";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteAccount = React.memo(({deleteUser, userId}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
    };

    const deleteAccount = () => {
        handleClose();
        deleteUser(userId);
    }

    return (
        <>
            <Link component="button" variant="body2" color={'secondary'} onClick={handleClickOpen}>
                Удалить аккаунт
            </Link>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Удаление аккаунта"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Вы действительно хотите удалить аккаунт?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Нет
                    </Button>
                    <Button onClick={deleteAccount} color="primary">
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
})

export default DeleteAccount;