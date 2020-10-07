import { snakeToCamel, camelToSnake } from './convert';

export interface Context {
  token?: string;
  apiUrl: string;
}

interface OptionsProps {
  method?: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  headers?: { [param: string]: string };
  body?: Object;
  // queryParams?: URLSearchParams;
  queryParams?: { [key: string]: any };
}

interface RequestProps {
  ctx: Context;
  url: string;
  options?: OptionsProps;
}

class ChickenhanError {
  public code: string;
  public name: string;
  public desc: string;

  constructor(code: string, name: string, desc: string) {
    this.code = code;
    this.name = name;
    this.desc = desc;
  }
}

const defaultOptions: OptionsProps = {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
};

export async function request<T>({
  ctx,
  url,
  options,
}: RequestProps): Promise<T> {
  const queryParams = options?.queryParams;

  const searchParams = queryParams
    ? `?${new URLSearchParams(camelToSnake(queryParams))}`
    : '';
  const endpoint = ctx.apiUrl + url + searchParams;

  const compiledOptions = { ...defaultOptions, ...options };

  if (ctx.token && compiledOptions.headers) {
    compiledOptions.headers['token'] = ctx.token;
  }

  if (compiledOptions.body && !(compiledOptions.body instanceof FormData)) {
    const convertedBodyToSnake = camelToSnake(compiledOptions.body);
    compiledOptions.body = JSON.stringify(convertedBodyToSnake);
  }

  try {
    const response = await fetch(endpoint, {
      ...(compiledOptions as any),
      headers: new Headers(compiledOptions.headers),
      mode: 'cors',
    });

    const body = await response.json();

    return snakeToCamel(body) as T;
  } catch (errorJson) {
    // приходит в виде JSON
    const error = snakeToCamel(JSON.parse(errorJson));

    throw new ChickenhanError(error.code, error.name, error.desc);
  }
}
