import {imageAcceptTypes, importAcceptTypes} from "./utils";

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

export function expertTestsValidate(data, showError) {
    let errors = [];
    required(data.name) && errors.push('Назва є обов`язковим для заповнення');
    required(data.time) && errors.push('Час є обов`язковим для заповнення');
    required(data.count_of_questions) && errors.push('Кількість питань є обов`язковим для заповнення');
    const maxLengthName = 255;
    const minLenghtTime = 1;
    const maxLenghtTime = 1440;
    const minLenghtQues = 5;
    const maxLenghtQues = 500;
    maxLengthCreator(maxLengthName)(data.name) && errors.push(`Назва задовга (максимум ${maxLengthName})`);
    minNumberCreator(minLenghtTime)(data.time) && errors.push(`Час може бути мінімум ${minLenghtTime}`);
    maxNumberCreator(maxLenghtTime)(data.time) && errors.push(`Час може бути максимум ${maxLenghtTime}`);
    minNumberCreator(minLenghtQues)(data.count_of_questions) && errors.push(`Кількість питань може бути мінімум ${minLenghtQues}`);
    maxNumberCreator(maxLenghtQues)(data.count_of_questions) && errors.push(`Кількість питань може бути максимум ${maxLenghtQues}`);
    showError(errors);
    return errors.length === 0;
}

export function adminPanelValidate(data, showError) {
    let errors = [];
    required(data.name) && errors.push('Назва є обов`язковим для заповнення');
    const maxLengthName = 255;
    maxLengthCreator(maxLengthName)(data.name) && errors.push(`Назва задовга (максимум ${maxLengthName})`);
    const validateEmail = data.user && email(data.user.email);
    validateEmail && errors.push(validateEmail);
    showError(errors);
    return errors.length === 0;
}

export function uploadImageQuestionValidate(uploadImage, showError) {
    let errors = [];
    uploadImage.size > 204800 && errors.push('Файл більше ніж 200 kB.');
    if (!uploadImage.type || !imageAcceptTypes.includes(uploadImage.type)) {
        errors.push(`Файл з таким типом (${uploadImage.type}) не можна завантажити як зображення.`);
    }
    showError(errors);
    return errors.length === 0;
}

export function importQuestionsValidate(file, showError) {
    let errors = [];
    if (!file.type || !importAcceptTypes.includes(file.type)) {
        errors.push(`Завантажте XML файл.`);
    }
    showError(errors);
    return errors.length === 0;
}