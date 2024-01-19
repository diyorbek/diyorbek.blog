import '../styles/tailwind.css';
import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0';
import { userFetcher } from '../utils/userFetcher';

function MyApp({ Component, pageProps }: any) {
  return (
    <UserProvider fetcher={userFetcher}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
