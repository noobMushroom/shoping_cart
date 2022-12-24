import Image from 'next/image';
import uuid from 'react-uuid';
import { useShoppingList } from '../context/ShoppingList';
import Stars from './Ratings';
import { ProductProps } from '../pages/[cat]/[id]';

export default function ProductDetails(data: ProductProps) {
  const { addProduct, reduceProduct, shoppingList } = useShoppingList();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-neutral-100 sm:flex  sm:gap-8 p-[1rem] sm:p-[1.5rem] sm:h-[30rem] sm:w-[60rem] sm:shadow-2xl">
        <div className="relative sm:w-[40rem] bg-white sm:h-[20rem]">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            priority={false}
            className="object-contain"
          />
        </div>
        <div>
          <div>
            <h1 className="sm:text-3xl sm:font-bold">{data.title}</h1>
          </div>
          <div>
            <h4 className="text-base text-neutral-700">{data.brand}</h4>
          </div>
          <div>
            <h1 className="font-bold sm:text-4xl sm:my-[1rem] text-red-600">
              {new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'usd',
              }).format(data.price)}
            </h1>
          </div>
          <div>
            <p className="text-sm text-gray-700 sm:my-[1rem]">
              {data.description}
            </p>
          </div>

          <div className="flex items-center sm:mt-10 sm:mb-12 gap-14">
            <div className="flex items-center text-black sm:text-2xl shadow-lg sm:w-[10rem] sm:h-[3rem]  border-2 border-black justify-evenly">
              <button
                onClick={() => addProduct(data)}
                className="border-r-2 border-black bg-red-700 sm:bg-transparent sm:hover:text-red-600 text-center h-[100%] w-full"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
              <h1 className="w-full text-center h-[100%] flex items-center justify-center">
                {shoppingList[data.title] ? (
                  <h1>{shoppingList[data.title].count}</h1>
                ) : (
                  <h1>0</h1>
                )}
              </h1>
              <button
                onClick={() => reduceProduct(data)}
                className="border-l-2 bg-blue-700 sm:bg-transparent border-black sm:hover:text-red-600 w-full h-[100%] text-center"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
            </div>
            <div>
              <button className="sm:h-[3rem] sm:px-[0.5rem] border-2 border-black text-sm sm:hover:bg-gray-800 sm:hover:text-white sm:hover:border-gray-800 duration-300">
                Remove Product
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <h3 className="sm:mr-2 font-bold capitalize">category:</h3>
            <h6 className="text-neutral-700 capitalize">{data.category}</h6>
          </div>
          <div className="flex items-center">
            <h3 className="sm:mr-2 font-bold capitalize">Stock:</h3>
            <h6 className="text-neutral-700 capitalize">{data.stock}</h6>
          </div>
          <div className="flex items-center">
            <h3 className="sm:mr-2 font-bold capitalize">Rating:</h3>
            <h6 className="text-neutral-700 capitalize">{data.rating}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
