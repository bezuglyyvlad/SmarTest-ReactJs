export const setBearerTokenToLS = (token) => {
    localStorage.setItem('bearerToken', token);
}

export const getBearerTokenFromLS = () => {
    return localStorage.getItem('bearerToken');
}