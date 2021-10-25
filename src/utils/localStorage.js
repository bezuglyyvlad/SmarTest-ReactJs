export const setAccessTokenToLS = (token) => {
    localStorage.setItem('access_token', token);
}

export const getAccessTokenFromLS = () => {
    return localStorage.getItem('access_token');
}

export const removeAccessTokenFromLS = () => {
    localStorage.removeItem('access_token');
}

export const setRefreshTokenToLS = (token) => {
    localStorage.setItem('refresh_token', token);
}

export const getRefreshTokenFromLS = () => {
    return localStorage.getItem('refresh_token');
}

export const removeRefreshTokenFromLS = () => {
    localStorage.removeItem('refresh_token');
}

export const getThemeFromLS = () => {
    return localStorage.getItem('theme');
}

export const setThemeToLS = (name) => {
    return localStorage.setItem('theme', name);
}

export const removeThemeFromLS = () => {
    localStorage.removeItem('theme');
}

export const getPerPageFromLS = () => {
    return localStorage.getItem('perPage');
}

export const setPerPageToLS = (perPage) => {
    return localStorage.setItem('perPage', perPage);
}