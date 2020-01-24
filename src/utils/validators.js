export const email = value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Некорректный адрес электронной почты';
    }
    return undefined;
}

export const required = value => {
    if (value) return undefined;
    return 'Это поле обязательно для заполнения';
}

export const minLengthCreator = (minLength) => (value) => {
    if (value.length < minLength) return `Значение слишком короткое (минимум ${minLength}).`;
    return undefined;
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Значение слишком длинное (максимум ${maxLength}).`;
    return undefined;
}