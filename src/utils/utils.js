import {kickUser} from "../redux/userReducer";
import queryString from "query-string";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";

export const getAvatarName = (name) => {
    return name.substr(0, 2);
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
    // eslint-disable-next-line eqeqeq
    if (n1 == 1) {
        return text_forms[0];
    }
    return text_forms[2];
}

export const errorInArrayOfString = array => {
    return array.map(i => {
        return i.message
    });
}

export function getFormData(formData, data, previousKey) {
    if (data instanceof Object) {
        Object.keys(data).forEach(key => {
            const value = data[key];
            if (value instanceof Object && !(value instanceof File) && !Array.isArray(value)) {
                return getFormData(formData, value, key);
            }
            if (previousKey) {
                key = `${previousKey}[${key}]`;
            }
            if (Array.isArray(value)) {
                value.forEach((val, index) => {
                    if (val instanceof Object && !Array.isArray(val)) {
                        return getFormData(formData, val, `${key}[${index}]`);
                    }
                    formData.append(`${key}[]`, val);
                });
            } else {
                formData.append(key, value);
            }
        });
    }
}

export const imageAcceptTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
export const importAcceptTypes = ["text/xml"];

export const downloadFile = (data, fileName) => {
    const blob = new Blob([data], {type: 'text/xml'});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const changeObjectInArray = (items, itemId, objPropName, newObj) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return newObj;
        }
        return u;
    })
}

export const defaultThunkReject = (e, dispatch) => {
    if (e?.response?.status === 401 && e.response?.config?.url === 'oauth/token/refresh') {
        console.log('refresh_token is invalid');
        kickUser(dispatch);
        return true;
    }
    return Promise.reject(e);
}

export const getDoublePaginationsUrlParams = (
    linkPageName,
    another_page,
    another_page_name,
    locationPathname,
    locationSearch
) => {
    let mainPath = locationPathname;
    if (another_page === 1) {
        linkPageName = '?' + linkPageName;
    } else {
        mainPath += `?${another_page_name}=${+queryString.parse(locationSearch)[another_page_name]}`;
        linkPageName = '&' + linkPageName;
    }
    return {mainPath, linkPageName};
}

export const useWidth = () => {
    const theme = useTheme();
    const keys = [...theme.breakpoints.keys].reverse();
    return (
        keys.reduce((output, key) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || 'xs'
    );
}