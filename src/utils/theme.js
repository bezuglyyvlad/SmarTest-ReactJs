import {createMuiTheme} from "@material-ui/core";

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {main: '#115293'},
        secondary: {main: '#dc004e'},
    },
});

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {main: '#648dae'},
        secondary: {main: '#f48fb1'},
    },
});

export const getTheme = (theme) => {
    return theme === 'dark' ? darkTheme : lightTheme;
}