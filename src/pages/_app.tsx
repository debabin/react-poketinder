import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';

import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from '@/server/routers';

import 'react-toastify/dist/ReactToastify.css';

import '@/styles/globals.css';

const App: AppType = ({ Component, pageProps }) => {
  const seo = {
    title: 'Poke Tinder ☄️',
    description: 'Do you like them all ☄️ ?'
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name='description' content={seo.description} />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: false,
            onError: (error) => toast.error((error as Error).message)
          }
        }
      }
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false
})(App);
