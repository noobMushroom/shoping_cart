import Image from 'next/image';
import uuid from 'react-uuid';
import { useRouter } from 'next/router';
import { DataProps } from '../pages/[cat]';
export default function ProductPage(props: DataProps) {
  const router = useRouter();

  function handleClick(category: string, id: number) {
    router.push(`/${category}/${id}`);
  }

  return (
    <div>
      <div className=" text-center sm:text-5xl sm:my-[1.5rem] playfulFont text-black text-2xl my-[1rem] capitalize font-bold">
        {props.name}
      </div>
      {props.data.products.map((product) => {
        return (
          <div
            key={uuid()}
            className=" flex flex-col sm:flex-row shadow-2xl w-[95vw] sm:my-[2rem] sm:p-[2rem] sm:w-[70vw] rounded-lg p-[0.5rem] my-[1rem] m-auto bg-zinc-300 items-center"
          >
            <div className="relative h-[12rem] sm:h-[15rem] sm:mr-[1rem] rounded-lg w-full">
              <Image
                src={product.thumbnail}
                fill
                alt={product.title}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col w-full sm:pl-[1rem]">
              <strong className="text-xl my-[0.5rem] playfulFont">
                {product.brand}
              </strong>
              <h1 className="text-xl font-semibold my-[0.2rem] playfulFont">
                {product.title}
              </h1>
              <div>
                <p>Price: {product.price}$</p>
                <p>Discount: {product.discountPercentage}%</p>
              </div>
              <div>
                <p>Rating: {product.rating}</p>
              </div>

              <div className="flex w-full h-[2.5rem] my-[0.5rem] sm:my-[1rem] ">
                <button className="w-full mx-[0.5rem] flex items-center sm:hover:scale-110 duration-300 sm:hover:bg-cyan-500 rounded-full justify-center bg-cyan-600 shadow-2xl">
                  <i className="fa-solid fa-circle-plus mr-[0.5rem] text-xl"></i>
                  Add to cart
                </button>
                <button
                  onClick={() => handleClick(product.category, product.id)}
                  className="w-full bg-red-600 flex items-center sm:hover:scale-110 duration-300 sm:hover:bg-red-500 rounded-full justify-center shadow-2xl "
                >
                  <i className="fa-solid fa-circle-info mr-[0.5rem] text-xl "></i>
                  See Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
