import * as yup from 'yup'

import testSchema, { FormName, FormValues } from './testSchemas';

type ErrorList = Array<{ item?: string, message: string }>

export interface ErrorInterface {
  formTested: FormName;
  errors: ErrorList;
}

const formatErrorList = (err: yup.ValidationError[]): ErrorList => {
  const errorList: ErrorList = []
  err.forEach((item) => {
    const error = {
      item: item.path,
      message: item.errors[0],
    }

    errorList.push(error);
  })

  return errorList;
}

const validateForm = async (
  value: FormValues,
  formName: FormName,
): Promise<ErrorInterface | undefined> => {
  const validationResult = await testSchema(formName, value);

  if (validationResult === true) return;

  const errorsList = formatErrorList(validationResult);

  return {
    formTested: formName,
    errors: errorsList,
  }
}

export default validateForm;
