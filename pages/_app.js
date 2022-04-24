import '../styles/globals.css';
import Head from 'next/head';
import '../styles/_user.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {' '}
        <title>Doan's Demo</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
