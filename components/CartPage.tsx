import { useAuth } from '../context/ContextProvider';
import { useShoppingList } from '../context/ShoppingList';
import uuid from 'react-uuid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function CartPage() {
  const router = useRouter();
  const { shoppingList, loading, addProduct, reduceProduct, handleDelete } =
    useShoppingList();
  const { currentUser } = useAuth();

  function totalCalculator() {
    let bill = 0;
    Object.keys(shoppingList).map((product: any) => {
      bill += shoppingList[product].price * shoppingList[product].count;
    });
    return bill;
  }

  function handleClick(category: string, id: number) {
    router.push(`/${category}/${id}`);
  }

  if (loading) return <div>Loading....</div>;
  return (
    <div className="w-[100vw] text-black p-[1rem] mt-[3rem] sm:mt-[5rem] min-h-screen mt-[1rem] sm:w-[60rem] sm:m-auto relative">
      {currentUser ? (
        <></>
      ) : (
        <div className="p-[0.5rem] sm:w-[60rem] my-[1rem] sm:my-[3rem] flex flex-col items-center justify-center">
          <div className="flex items-center text-xl sm:text-2xl  justify-center text-red-600">
            <i className="fa-solid fa-triangle-exclamation mr-[0.5rem] sm:mr-[1rem]"></i>
            <p>Sign in to save your files</p>
          </div>
          <div className="mt-[0.5rem] sm:mt[1.5rem]">
            <Link href={'/login'} className="text-xl sm:text-2xl text-cyan-600">
              Login
            </Link>
          </div>
        </div>
      )}
      <div className="flex mb-[3rem] w-full border-2 border-orange-600 sm:px-[1rem] sticky sm:text-3xl top-[3.7rem] sm:top-[4.5rem] left-0 bg-stone-800 z-50 rounded-md p-[0.5rem] justify-between items-center">
        <h1>
          <i className="fa-solid fa-cart-shopping mr-[0.5rem] sm:mr-[1rem]"></i>
          Your Cart
        </h1>
        <div className="flex">
          <h1 className=" mr-[0.5rem] sm:mr-[1rem]">Total:</h1>
          <h1 className="text-cyan-600 bold">
            <i className="fa-sharp fa-solid fa-dollar-sign"></i>
            {totalCalculator()}
          </h1>
        </div>
      </div>
      <div>
        {Object.keys(shoppingList).map((product: any) => {
          return (
            <div
              key={uuid()}
              className=" flex flex-col sm:flex-row shadow-2xl w-[95vw] sm:my-[2rem] sm:p-[2rem] sm:w-[70vw] rounded-lg p-[0.5rem] my-[1rem] m-auto bg-gray-100 items-center"
            >
              <div className="relative bg-white h-[12rem] sm:h-[15rem] sm:mr-[1rem] w-full">
                <Image
                  src={shoppingList[product].thumbnail}
                  fill
                  priority={false}
                  alt={shoppingList[product].title}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col w-full mt-4 sm:mt-0 sm:pl-[1rem]">
                <div>
                  <strong className="text-xs text-gray-700">
                    {shoppingList[product].brand}
                  </strong>
                  <h1 className="text-xl sm:text-2xl font-semibold mt-[0.2rem]">
                    {shoppingList[product].title}
                  </h1>
                </div>
                <div>
                  <div className="flex items-center">
                    <h1 className="font-bold text-2xl sm:text-4xl my-2 text-red-600">
                      {new Intl.NumberFormat('en-us', {
                        style: 'currency',
                        currency: 'usd',
                      }).format(shoppingList[product].price)}
                    </h1>
                  </div>
                  <div className="flex items-center">
                    <h2 className="mr-2 text-gray-800">Total:</h2>
                    <h2 className="font-bold">
                      {new Intl.NumberFormat('en-us', {
                        style: 'currency',
                        currency: 'usd',
                      }).format(
                        shoppingList[product].price *
                          shoppingList[product].count
                      )}
                    </h2>
                  </div>
                </div>
                <div className="flex my-[0.5rem] items-center sm:my-[1rem] gap-4 sm:gap-10 ">
                  <div className="flex items-center text-black sm:text-2xl shadow-lg w-[8rem] h-[2rem] sm:h-[2.5rem] border-2 border-black justify-evenly">
                    <button
                      onClick={() => addProduct(shoppingList[product])}
                      className="border-r-2 border-black bg-red-700 sm:bg-transparent sm:hover:text-red-600 text-center h-[100%] w-full"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <h1 className="w-full text-center h-[100%] flex items-center justify-center">
                      {shoppingList[product].title ? (
                        <h1>{shoppingList[product].count}</h1>
                      ) : (
                        <h1>0</h1>
                      )}
                    </h1>
                    <button
                      onClick={() => reduceProduct(shoppingList[product])}
                      className="border-l-2 bg-blue-700 sm:bg-transparent border-black sm:hover:text-red-600 w-full h-[100%] text-center"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(shoppingList[product])}
                      className="h-[2rem] sm:h-[2.5rem] shadow-lg px-[0.5rem] border-2 border-black text-sm sm:hover:bg-gray-800 sm:hover:text-white sm:hover:border-gray-800 duration-300"
                    >
                      Remove Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
