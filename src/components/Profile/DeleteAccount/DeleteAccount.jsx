import { memo, useState } from "react";
import Link from "@mui/material/Link";
import {DialogCreator} from "../../common/UIElements";
import Button from "@mui/material/Button";

const DeleteAccount = memo(({deleteUser, userId}) => {
    const [open, setOpen] = useState(false);

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
            <Link component="button" variant="body2" color='secondary' onClick={handleClickOpen}>
                Видалити акаунт
            </Link>
            <DialogCreator open={open} handleClose={handleClose} title='Видалення акаунта'
                           text='Ви дійсно хочете видалити акаунт?' confirmButton={
                <Button onClick={deleteAccount}>
                    Так
                </Button>}/>
        </>
    )
})

export default DeleteAccount;