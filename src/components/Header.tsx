import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import { RiHome2Line } from 'react-icons/ri';
import useUser from '../libs/useUser';
import fetchJson from '../libs/fetchJson';

export default function Header() {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    mutateUser(await fetchJson(
      '/api/logout', {
        method: 'POST'
      }), false);
    router.push('/login');
  }

  return (
    <Box style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 3vw',
    }}>
      <Typography variant="h2">
        Receitas da Vovó
      </Typography>
      <Box>
        <Link href="/home">
          <RiHome2Line />
          Página inicial
        </Link>
          {
            user?.isLoggedIn
            ? (
              <>
                <Link href="/login">Entrar</Link>
                <p>/</p>
                <Link href="/signup">Cadastrar</Link>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={ handleClick }
                >
                  <Link
                    href='/api/logout'
                  >
                    Sair
                  </Link>
                </Button>
              </>
            )
          }
      </Box>
    </Box>
  );
}
