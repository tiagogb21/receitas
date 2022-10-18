import Head from 'next/head';
import Header from './Header';
import Box from '@mui/material/Box';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Disc Storage</title>
      </Head>

      <Header />
      <Box>
        {children}
      </Box>
    </>
  );
}
