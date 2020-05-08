export const email = value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Некоректна адреса електронної пошти';
    }
    return undefined;
}

export const required = value => {
    if (value) return undefined;
    return 'Це поле є обов`язковим для заповнення';
}

export const minLengthCreator = (minLength) => (value) => {
    if (value.length < minLength) return `Значення занадто коротке (мінімум ${minLength}).`;
    return undefined;
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Значення задовге (максимум ${maxLength}).`;
    return undefined;
}

export const minNumberCreator = (minNumber) => (value) => {
    if (value < minNumber) return `Значення менше ніж ${minNumber}).`;
    return undefined;
}

export const maxNumberCreator = (maxNumber) => (value) => {
    if (value > maxNumber) return `Значення більше ніж ${maxNumber}).`;
    return undefined;
}