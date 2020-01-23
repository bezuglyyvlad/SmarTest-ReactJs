export const email = value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Некорректный адрес электронной почты';
    }
}

export const required = value => {
    if (value) return undefined;
    return 'Это поле обязательно для заполнения';
}