import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import MainList from "./MainList/MainList";
import SettingsList from "./SettingsList/SettingsList";

const SideMenu = React.memo(({isAuth}) => {
    const [drawer, setDrawer] = React.useState(false);

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawer(open);
    };

    return (
        <div>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon/>
            </IconButton>
            <Drawer open={drawer} onClose={toggleDrawer(false)}>
                {isAuth && <MainList toggleDrawer={toggleDrawer}/>}
                <SettingsList toggleDrawer={toggleDrawer}/>
            </Drawer>
        </div>
    );
})

export default SideMenu;