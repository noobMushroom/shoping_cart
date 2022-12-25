import Image from 'next/image';
import { useShoppingList } from '../context/ShoppingList';
import { ProductProps } from '../pages/[cat]/[id]';

export default function ProductDetails(data: ProductProps) {
  const { addProduct, reduceProduct, shoppingList, handleDelete } =
    useShoppingList();
  return (
    <div className="min-h-screen flex sm:items-center justify-center">
      <div className="sm:bg-neutral-100 sm:flex sm:gap-8 p-[1rem] sm:p-[1.5rem] sm:min-h-[30rem] sm:w-[60rem] sm:shadow-2xl">
        <div className="relative w-full h-[10rem] sm:w-[20rem] bg-white sm:h-[20rem]">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            priority={false}
            className="object-contain"
          />
        </div>
        <div className="sm:w-[40rem]">
          <div>
            <h1 className="text-xl mt-6 mb-1 sm:m-0 sm:text-3xl font-bold">
              {data.title}
            </h1>
          </div>
          <div>
            <h4 className="text-sm sm:text-base text-neutral-700">
              {data.brand}
            </h4>
          </div>
          <div>
            <h1 className="font-bold text-2xl sm:text-4xl my-2 sm:my-[1rem] text-red-600">
              {new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'usd',
              }).format(data.price)}
            </h1>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-700 sm:my-[1rem]">
              {data.description}
            </p>
          </div>

          <div className="flex items-center mt-8 mb-10 sm:mt-10 sm:mb-12 gap-4 sm:gap-14">
            <div className="flex items-center text-black sm:text-2xl shadow-lg w-[10rem] h-[3rem] border-2 border-black justify-evenly">
              <button
                onClick={() => addProduct(data)}
                className="border-r-2 border-black bg-red-700 sm:bg-transparent sm:hover:text-red-600 text-center h-[100%] w-full"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
              <span className="w-full text-center h-[100%] flex items-center justify-center">
                {shoppingList[data.title] ? (
                  <h1>{shoppingList[data.title].count}</h1>
                ) : (
                  <h1>0</h1>
                )}
              </span>
              <button
                onClick={() => reduceProduct(data)}
                className="border-l-2 bg-blue-700 sm:bg-transparent border-black sm:hover:text-red-600 w-full h-[100%] text-center"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
            </div>
            {shoppingList[data.title] ? (
              <button
                onClick={() => handleDelete(data)}
                className="h-[3rem] px-[0.5rem] border-2 border-black text-sm sm:hover:bg-gray-800 sm:hover:text-white sm:hover:border-gray-800 duration-300"
              >
                Remove Product
              </button>
            ) : (
              <></>
            )}
            <div></div>
          </div>
          <div className="flex items-center">
            <h3 className="mr-2 font-bold capitalize">category:</h3>
            <h6 className="text-neutral-700 capitalize">{data.category}</h6>
          </div>
          <div className="flex items-center">
            <h3 className="mr-2 font-bold capitalize">Stock:</h3>
            <h6 className="text-neutral-700 capitalize">{data.stock}</h6>
          </div>
          <div className="flex items-center">
            <h3 className="mr-2 font-bold capitalize">Rating:</h3>
            <h6 className="text-neutral-700 capitalize">{data.rating}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
