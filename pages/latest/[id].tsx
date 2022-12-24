import ProductDetails from '../../components/ProductDetail';
import { GetStaticPaths, GetStaticProps } from 'next';
export interface LatesProductProps {
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

export type props = {
  data: LatesProductProps;
};
export default function LatestProducts(props: props) {
  const { data } = props;
  return (
    <div>
      <ProductDetails {...data} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch('https://fakestoreapi.com/products');
  const res = await data.json();
  const allPaths = res.map((product: LatesProductProps) => {
    return { params: { id: product.id.toString() } };
  });
  return {
    fallback: false,
    paths: allPaths,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const data = await fetch(`https://fakestoreapi.com/products/${id}`);
  const res = await data.json();
  const fomattedProduct = {
    count: 0,
    brand: 'cool brand',
    description: res.description,
    discountPercentage: '3',
    id: res.id,
    images: [res.image],
    title: res.title,
    thumbnail: res.image,
    stock: res.rating.count,
    rating: res.rating.rate,
    price: res.price,
    category: res.category,
  };
  return {
    props: {
      data: fomattedProduct,
    },
  };
};
