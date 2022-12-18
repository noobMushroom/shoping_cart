import { GetStaticProps, GetStaticPaths } from 'next';
import ProductDetails from '../../components/ProductDetail';
export interface Props {
  data: {
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
  };
}

export default function ProductDetail(data: Props) {
  return <ProductDetails data={data.data} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch('https://dummyjson.com/products?limit=98');
  const res = await data.json();
  const allPaths = res.products.map(
    (product: {
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
    }) => {
      return {
        params: {
          cat: product.category,
          id: product.id.toString(),
        },
      };
    }
  );

  return {
    paths: allPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const category = context.params!.cat;
  const id = context.params!.id;

  const data = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const res = await data.json();
  const product = res.products.find(
    (product: {
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
    }) => product.id.toString() === id
  );

  return {
    props: {
      data: product,
    },
  };
};
