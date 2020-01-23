import {NavLink} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";

const ProfileMenu = React.memo(({logout}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [disableLogout, setDisableLogout] = React.useState(false);

    const handleCloseLogout = () => {
        handleClose();
        setDisableLogout(true);
        logout();
    };

    return (
        <div>
            <IconButton edge="end"
                        color="inherit" aria-controls="profile-menu" aria-haspopup="true"
                        onClick={handleClick}><Avatar>Vl</Avatar></IconButton>
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={NavLink} to='/profile' onClick={handleClose}>Профиль</MenuItem>
                <MenuItem onClick={handleCloseLogout} disabled={disableLogout}>Выйти</MenuItem>
            </Menu>
        </div>
    )
})

export default ProfileMenu;