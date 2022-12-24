import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import ProductDetails from '../../components/ProductDetail';
export interface ProductProps {
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
interface Props {
  data: ProductProps;
}
export default function ProductDetail(props: Props) {
  return (
    <div>
      <Head>
        <title>{props.data.title}</title>
      </Head>
      <ProductDetails {...props.data} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch('https://dummyjson.com/products?limit=98');
  const res = await data.json();
  const allPaths = res.products.map((product: ProductProps) => {
    return {
      params: {
        cat: product.category,
        id: product.id.toString(),
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params!.id;

  // calling the api with category it will return an array of all items from that category
  const data = await fetch(`https://dummyjson.com/products/${id}`);
  const res = await data.json();

  return {
    props: {
      data: { ...res, count: 0 },
    },
  };
};
