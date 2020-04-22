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

export const getTimer = (dataFinish) => {
    const current = new Date();
    const finish = new Date(dataFinish);
    const timer = finish.getTime() - current.getTime();

    let day = parseInt(timer / (60 * 60 * 1000 * 24));
    let hour = parseInt(timer / (60 * 60 * 1000)) % 24;
    if (day !== 0) hour += day * 24;
    if (hour < 10) {
        hour = '0' + hour;
    }

    var min = parseInt(timer / (1000 * 60)) % 60;
    if (min < 10) {
        min = '0' + min;
    }

    var sec = parseInt(timer / 1000) % 60;
    if (sec < 10) {
        sec = '0' + sec;
    }

    return `${hour}:${min}:${sec}`;
}

export const num2str = (n, text_forms) => {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) {
        return text_forms[2];
    }
    if (n1 > 1 && n1 < 5) {
        return text_forms[1];
    }
    if (n1 == 1) {
        return text_forms[0];
    }
    return text_forms[2];
}