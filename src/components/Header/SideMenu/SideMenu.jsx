import { memo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import MainList from "./MainList/MainList";
import SettingsList from "./SettingsList/SettingsList";
import Box from "@mui/material/Box";

const SideMenu = memo(({isAuth}) => {
    const [drawer, setDrawer] = useState(false);

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawer(open);
    };

    return (
        <Box>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon/>
            </IconButton>
            <Drawer open={drawer} onClose={toggleDrawer(false)}>
                {isAuth && <MainList toggleDrawer={toggleDrawer}/>}
                <SettingsList toggleDrawer={toggleDrawer}/>
            </Drawer>
        </Box>
    );
})

export default SideMenu;