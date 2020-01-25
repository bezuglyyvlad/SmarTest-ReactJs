export const setBearerTokenToLS = (token) => {
    localStorage.setItem('bearerToken', token);
}

export const getBearerTokenFromLS = () => {
    return localStorage.getItem('bearerToken');
}

export const getAvatarUsername = (username) => {
    return username.substr(0, 2);
}