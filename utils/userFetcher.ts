// custom fetcher to filter out "/auth/me 401" error for public pages
// copied from nextjs-auth0 source: https://github.com/auth0/nextjs-auth0/blob/main/src/client/use-user.tsx#L201
export const userFetcher = async (url: string) => {
  const isPublicPage = !window.location.pathname.startsWith('/blog/edit');

  if (isPublicPage) return Promise.resolve({});

  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new RequestError(0); // Network error
  }
  if (response.status == 204) return undefined;
  if (response.ok) return response.json();
  throw new RequestError(response.status);
};

export class RequestError extends Error {
  public status: number;

  constructor(status: number) {
    /* c8 ignore next */
    super();
    this.status = status;
    Object.setPrototypeOf(this, RequestError.prototype);
  }
}
