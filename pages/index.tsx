import HomePage from '../components/HomePage';
import Head from 'next/head';

interface homeProps {
  products: [{ title: string; url: string[] }];
}

export default function Home(props: homeProps) {
  return (
    <div className="w-full">
      <Head>
        <title>Shopping Cart</title>
        <meta
          name="description"
          content=" At our website, you can easily create a personalized shopping cart with all of your favorite products. With a wide selection of items available, you're sure to find everything you need. From clothing and accessories to electronics and home goods, we've got you covered. Start building your dream cart today!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage products={props.products} />
    </div>
  );
}

export async function getServerSideProps() {
  const { products } = await import('../public/data.json');
  return {
    props: {
      products: products,
    },
  };
}
