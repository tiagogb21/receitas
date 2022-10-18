// este arquivo é um wrapper com padrões a serem usados ​
// em ambas as rotas da API e funções `getServerSideProps
import type { IronSessionOptions } from 'iron-session';

import type { User } from '../pages/api/user';

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'iron-session/examples/next.js',
  cookieOptions: {
    // secure:
    // true should be used in production (HTTPS) but can't be used in development (HTTP)
    secure: process.env.NODE_ENV === 'production',
  },
}

// Aqui especificamos as tipagens de req.session.
declare module 'iron-session' {
  interface IronSessionData {
    user?: User
  }
}
