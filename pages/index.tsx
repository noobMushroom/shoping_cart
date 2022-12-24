import HomePage from '../components/HomePage';
import { LatesProductProps } from './latest/[id]';
import Head from 'next/head';
import uuid from 'react-uuid';

export interface homeProps {
  products: [
    {
      count: number;
      brand: string;
      description: string;
      discountPercentage: string;
      id: number;
      images: string[];
      title: string;
      thumbnail: string;
      stock: string;
      rating: number;
      price: number;
      category: string;
    }
  ];
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

interface Product {
  title: string;
  image: string;
  rating: { rate: number; count: number };
  price: number;
  description: string;
  id: number;
  category: string;
}

export async function getStaticProps() {
  const data = await fetch('https://fakestoreapi.com/products');
  const response = await data.json();
  const productData = response.map((product: Product) => {
    return {
      count: 0,
      brand: 'lorem ipsum',
      description: product.description,
      discountPercentage: '3',
      id: product.id,
      images: [product.image],
      title: product.title,
      thumbnail: product.image,
      stock: product.rating.count,
      rating: product.rating.rate,
      price: product.price,
      category: product.category,
    };
  });
  return {
    props: {
      products: productData,
    },
  };
}
