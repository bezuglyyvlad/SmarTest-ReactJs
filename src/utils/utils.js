export const setBearerTokenToLS = (token) => {
    localStorage.setItem('bearerToken', token);
}

export const getBearerTokenFromLS = () => {
    return localStorage.getItem('bearerToken');
}

export const removeBearerTokenFromLS = () => {
    localStorage.removeItem('bearerToken');
}

export const getAvatarUsername = (username) => {
    return username.substr(0, 2);
}

export const getThemeFromLS = () => {
    return localStorage.getItem('theme');
}

export const setThemeFromLS = (name) => {
    return localStorage.setItem('theme', name);
}

export const removeThemeFromLS = () => {
    localStorage.removeItem('theme');
}