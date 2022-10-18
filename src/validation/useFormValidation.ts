import { useState, useCallback } from 'react';

import validateForm, { ErrorInterface } from '.';

import { IUser } from '../interfaces/IUser';

import { FormName } from './testSchemas';

export interface DefaultForm {
  [key: string]: unknown
};

const useFormValidation = <Form = DefaultForm>(formName: FormName): any => {
  const [errorItems, setErrorItems] = useState<ErrorInterface>()

  const validateError = async (formParams:
  | IUser
  ): Promise<boolean> => {
    const errors = await validateForm(formParams, formName)

    if (errors != null) {
      setErrorItems(errors)
      return false
    }
    return true
  }

  const handleErrorMessage = useCallback(
    (item: keyof Form, helperText?: string) => {
      if (errorItems != null) {
        const error = errorItems.errors.find((err) => err.item === item);

        if (error != null) return { error: true, helperText: error?.message }
      }
    },
    [errorItems]
  )

  const clearErrors = (): void => {
    setErrorItems(undefined);
  }

  return { handleErrorMessage, clearErrors, validateError, errorItems }
}

export default useFormValidation;
