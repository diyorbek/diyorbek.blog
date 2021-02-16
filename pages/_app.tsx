import '../styles/tailwind.css';
import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }: any) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
