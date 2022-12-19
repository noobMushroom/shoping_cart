import { GetStaticProps, GetStaticPaths } from 'next';
import ProductPage from '../../components/ProductPage';
export interface DataProps {
  name: string;
  data: [
    {
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
export default function Category(data: DataProps) {
  return (
    <div>
      <ProductPage data={data.data} name={data.name} />
    </div>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const urls = await fetch('https://dummyjson.com/products/categories');
  const res = await urls.json();

  const paths = res.map((product: string) => {
    return {
      params: { cat: product },
    };
  });

  return {
    fallback: false,
    paths: paths,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const cat: any = context.params!.cat;
  const data = await fetch(`https://dummyjson.com/products/category/${cat}`);
  const res = await data.json();

  const products = res.products.map((product: any) => {
    return {
      ...product,
    };
  });

  console.log(products);

  return {
    props: {
      data: products,
      name: cat,
    },
  };
};
