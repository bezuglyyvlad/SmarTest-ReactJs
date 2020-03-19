import React from "react";
import Link from "@material-ui/core/Link";
import {DialogCreator} from "../../common/UIElements";
import Button from "@material-ui/core/Button";

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
            <DialogCreator open={open} handleClose={handleClose} title='Удаление аккаунта'
                           text='Вы действительно хотите удалить аккаунт?' confirmButton={
                <Button onClick={deleteAccount} color="primary">
                    Да
                </Button>}/>
        </>
    )
})

export default DeleteAccount;