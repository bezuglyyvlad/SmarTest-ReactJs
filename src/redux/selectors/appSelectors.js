import {getMuiTheme} from "../../utils/theme";
import {createSelector} from "reselect";

export const appSelectors = {
    getInitialized(state) {
        return state.app.initialized;
    },
    getTheme(state) {
        return state.app.theme;
    },
    getPerPage(state) {
        return state.app.perPage;
    }
}

const muiThemeReselect = createSelector(appSelectors.getTheme, theme => {
    return getMuiTheme(theme);
})

appSelectors.getMuiTheme = muiThemeReselect;