import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import SideList from "./SideList/SideList";

const SideMenu = React.memo(() => {
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
                <SideList toggleDrawer={toggleDrawer}/>
            </Drawer>
        </div>
    );
})

export default SideMenu;