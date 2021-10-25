import { memo } from "react";

import {makeStyles} from "@mui/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import SideMenu from "./SideMenu/SideMenu";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBrain} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {signOut} from "../../redux/userReducer";
import {userSelectors} from "../../redux/selectors/userSelectors";
import {compose} from "redux";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    },
    logo: {
        fontSize: 'inherit',
        textTransform: 'inherit',
        color: 'inherit',
    },
    logoIcon: {
        marginRight: '5px'
    }
}));

const Header = memo(({isAuth, signOut, name}) => {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <SideMenu isAuth={isAuth}/>
                <Typography variant="h6" className={classes.title}>
                    <Button component={NavLink} to='/' className={classes.logo}>
                        <FontAwesomeIcon icon={faBrain} className={classes.logoIcon}/>SmarTest
                    </Button>
                </Typography>
                {isAuth ?
                    <ProfileMenu signOut={signOut} name={name}/>
                    : < IconButton component={NavLink} to='signin' edge="end"
                                   color="inherit" aria-label="Sign In"><AccountCircleIcon/></IconButton>
                }
            </Toolbar>
        </AppBar>
    );
})

const mapStateToProps = (state) => ({
    isAuth: userSelectors.getIsAuth(state),
    name: userSelectors.getName(state),
})

export default compose(connect(mapStateToProps, {signOut}))(Header);