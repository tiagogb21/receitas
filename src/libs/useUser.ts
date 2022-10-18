import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

import { User } from '../pages/api/user';

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>('/api/user')

  useEffect(() => {
    // se os dados do usuário ainda não estiverem lá
    // (busca em andamento, logado ou não), não faça nada
    if (!redirectTo || !user) return;

    if (
      // Se redirectTo estiver definido
      // verifica se o usuario foi encontrado,
      // em caso negativo, redireciona o usuário.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // Se redirectIfFound estiver definido,
      // e o usuário for encontrado, redirecione
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}
