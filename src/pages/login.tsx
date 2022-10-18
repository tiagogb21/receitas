import React, { useState } from 'react';
import useUser from '../libs/useUser';
import Form from '../components/Form';
import fetchJson, { FetchError } from '../libs/fetchJson';

export default function Login() {
  // Verificamos se o usuário já está logado e redirecionamos para o perfil
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const body = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    try {
      mutateUser(
        await fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error('An unexpected error happened:', error);
      }
    }
  };

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Form
        errorMessage={ errorMsg }
        isLogin={ false }
        onSubmit={ handleSubmit }
      />
    </main>
  );
}
