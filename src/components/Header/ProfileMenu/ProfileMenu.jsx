import {NavLink} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import {getAvatarUsername} from "../../../utils/utils";

const ProfileMenu = React.memo(({signOut, username}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [disableSignOut, setDisableSignOut] = React.useState(false);

    const handleCloseSignOut = () => {
        handleClose();
        setDisableSignOut(true);
        signOut();
    };

    return (
        <div>
            <IconButton edge="end"
                        color="inherit" aria-controls="profile-menu" aria-haspopup="true"
                        onClick={handleClick}><Avatar>{getAvatarUsername(username)}</Avatar></IconButton>
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