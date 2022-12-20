import CartPage from '../../components/CartPage';
import Head from 'next/head';
export default function Cart() {
  return (
    <div className="text-white">
      <Head>
        <title>Cart</title>
      </Head>
      <CartPage />
    </div>
  );
}
