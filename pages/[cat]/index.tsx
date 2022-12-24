import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import ProductPage from '../../components/ProductPage';
export interface DataProps {
  name: string;
  data: [
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
export default function Category(data: DataProps) {
  return (
    <div>
      <Head>
        <title>{data.name}</title>
        <meta
          name="description"
          content="Our  selection is second to none. With a variety of styles, brands, and price points to choose from, you're sure to find the perfect for your needs. Whether you're shopping for  or just looking to add to your collection, we've got you covered. Browse through our selection today and find the perfect for you!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductPage data={data.data} name={data.name} />
    </div>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  //fetching all the categories for category page. this function sets all the path for the url ex:(www.com/category)
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
      count: 0,
    };
  });

  return {
    props: {
      data: products,
      name: cat,
    },
  };
};
