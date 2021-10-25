import {NavLink} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { memo, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import {getAvatarName} from "../../../utils/utils";

const ProfileMenu = memo(({signOut, name}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [disableSignOut, setDisableSignOut] = useState(false);

    const handleCloseSignOut = () => {
        handleClose();
        setDisableSignOut(true);
        signOut();
    };

    return (
        <div>
            <IconButton edge="end"
                        color="inherit" aria-controls="profile-menu" aria-haspopup="true"
                        onClick={handleClick}><Avatar>{getAvatarName(name)}</Avatar></IconButton>
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={NavLink} to='/profile' onClick={handleClose}>Профіль</MenuItem>
                <MenuItem onClick={handleCloseSignOut} disabled={disableSignOut}>Вийти</MenuItem>
            </Menu>
        </div>
    )
})

export default ProfileMenu;