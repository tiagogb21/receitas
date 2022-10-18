import { FormEvent } from 'react';
import { Box, Button, FormControl, FormLabel, Input, TextField, Typography } from '@mui/material';
import Link from 'next/link';

interface IForm {
  errorMessage: string;
  isLogin: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function Form({
  errorMessage,
  isLogin,
  onSubmit,
}: IForm) {
  return (
    <form
      onSubmit={ onSubmit }
      style={{
        width: '60vw',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid #c7c7c7',
        borderRadius: '6px',
        padding: '3vw',
      }}
    >
      <Typography variant="h2">
        {isLogin ? 'Entrar' : 'Cadastrar'}
      </Typography>

      <FormControl>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input
          type='text'
          name='email'
          placeholder='example@email.com'
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input
          type='password'
          name='password'
          placeholder='******'
          required
        />
      </FormControl>

      <Button type='submit'>
        Entrar
      </Button>

      <p>
        { isLogin ?
          (
            <>
              <span>Não tem uma conta?</span>
              <Link href="/signup">Crie agora</Link>
            </>
          ): (
            <>
              <span>Ja tem uma conta?</span>
              <Link style={{ color: 'blue' }} href="/login">Faça login</Link>
            </>
          )
        }
      </p>

      { errorMessage && <p className='error'>{errorMessage}</p> }
    </form>
  );
}
