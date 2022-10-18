export default async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, init);

  // Se o servidor responder, entao há dados em json
  // Se houver um erro de rede, ele será lançado na linha anterior
  const data = await response.json();

  // response.ok é verdadeiro quando res.status é 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (response.ok) {
    return data;
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  });
}

export class FetchError extends Error {
  response: Response;
  data: {
    message: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      message: string;
    };
  }) {
    // Passamos os argumentos restantes (incluindo os
    // específicos do fornecedor) para o construtor pai
    super(message);

    // Mantém o rastreamento de pilha adequado para onde
    // nosso erro foi lançado (disponível apenas na V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    this.response = response;
    this.data = data ?? { message: message };
  }
}
