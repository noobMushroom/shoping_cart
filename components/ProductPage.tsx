import Image from 'next/image';
import uuid from 'react-uuid';
import { DataProps } from '../pages/[cat]';
export default function ProductPage(props: DataProps) {
  return (
    <div>
      {props.data.products.map((product) => {
        return (
          <div
            key={uuid()}
            className=" flex flex-col shadow-2xl w-[95vw] rounded-lg p-[0.5rem] my-[1rem] m-auto bg-stone-300 items-center"
          >
            <div className="relative h-[12rem] w-full">
              <Image
                src={product.thumbnail}
                fill
                alt={product.title}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col w-full">
              <strong className="text-xl mb-[0.3rem]">{product.brand}</strong>
              <h1 className="text-xl font-semibold my-[0.2rem]">
                {product.title}
              </h1>
              <div>
                <p>Price: {product.price}$</p>
                <p>Discount: {product.discountPercentage}%</p>
              </div>
              <div>
                <p>Rating: {product.rating}</p>
              </div>

              <div className="flex w-full h-[2rem] my-[0.5rem] ">
                <button className="w-full mx-[0.5rem] flex items-center rounded-full justify-center bg-cyan-600 shadow-2xl">
                  <i className="fa-solid fa-circle-plus mr-[0.5rem] text-xl"></i>
                  Add to cart
                </button>
                <button className="w-full bg-red-600 flex items-center rounded-full justify-center shadow-2xl ">
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
