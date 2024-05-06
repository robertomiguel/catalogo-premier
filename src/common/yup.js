/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup'

const yupLocales = {
  mixed: {
    default: 'Revise este campo',
    required: 'Este campo es obligatorio',
  },
  number: {
    min: 'Debe ser mayor a ${min}',
    max: 'Debe ser menor a ${max}',
  },
  string: {
    min: 'Debe tener al menos ${min} caracteres',
    max: 'Debe tener como máximo ${max} caracteres',
    email: 'Debe ser un email válido',
  },
}
yup.setLocale(yupLocales);

export default yup;
