import { GetStaticProps, GetStaticPaths } from 'next';
import ProductPage from '../../components/ProductPage';
export interface DataProps {
  data: {
    products: [
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
  };
}
export default function Category(data: DataProps) {
  console.log(data.data.products);
  return (
    <div>
      <ProductPage data={data.data} />
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
    fallback: 'blocking',
    paths: paths,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const cat: any = context.params!.cat;
  const data = await fetch(`https://dummyjson.com/products/category/${cat}`);
  const res = await data.json();

  return {
    props: {
      data: res,
    },
  };
};
