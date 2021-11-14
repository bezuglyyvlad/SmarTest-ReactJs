import { imageAcceptTypes, importAcceptTypes } from './utils'

export const email = value => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Некоректна адреса електронної пошти'
  }
  return undefined
}

export const required = value => {
  if (value) return undefined
  return 'Це поле є обов`язковим для заповнення'
}

export const minLengthCreator = (minLength) => (value) => {
  if (value.length < minLength) return `Значення занадто коротке (мінімум ${minLength}).`
  return undefined
}

export const maxLengthCreator = (maxLength) => (value) => {
  if (value.length > maxLength) return `Значення задовге (максимум ${maxLength}).`
  return undefined
}

export const minNumberCreator = (minNumber) => (value) => {
  if (value < minNumber) return `Значення менше ніж ${minNumber}).`
  return undefined
}

export const maxNumberCreator = (maxNumber) => (value) => {
  if (value > maxNumber) return `Значення більше ніж ${maxNumber}).`
  return undefined
}

export const fieldMatch = matchName => (value, allValues, props) => {
  return value !== allValues[matchName] ? `Поле не співпадає з ${matchName}` : undefined
}

export function uploadImageQuestionValidate (uploadImage, showError) {
  const errors = []
  uploadImage.size > 512000 && errors.push('Файл більше ніж 500 kB.')
  if (!uploadImage.type || !imageAcceptTypes.includes(uploadImage.type)) {
    errors.push(`Файл з таким типом (${uploadImage.type}) не можна завантажити як зображення.`)
  }
  showError(errors)
  return errors.length === 0
}

export function importQuestionsValidate (file, showError) {
  const errors = []
  if (!file.type || !importAcceptTypes.includes(file.type)) {
    errors.push('Завантажте XML файл.')
  }
  showError(errors)
  return errors.length === 0
}
