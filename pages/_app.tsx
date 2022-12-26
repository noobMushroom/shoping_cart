import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Context from '../context/ContextProvider';
import ShoppingListProvider from '../context/ShoppingList';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Context>
      <ShoppingListProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </ShoppingListProvider>
    </Context>
  );
}
