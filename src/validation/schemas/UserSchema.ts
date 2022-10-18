import * as yup from 'yup';

const userSchema = yup.object().shape({
  name: yup
    .string()
    .required('Campo obrigatório!'),
  email: yup
    .string()
    .required('Campo obrigatório!')
    .email('Email inválido!'),
  password: yup
    .string()
    .required('Campo obrigatório!'),
});

export default userSchema;
