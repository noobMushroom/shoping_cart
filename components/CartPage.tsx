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
    <div className="w-[100vw] p-[1rem] min-h-screen mt-[1rem] sm:w-[60rem] sm:m-auto relative">
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
      <div className="flex w-full border-2 border-orange-600 sm:px-[1rem] sticky sm:text-3xl top-[3.7rem] sm:top-[4.5rem] left-0 bg-stone-800 z-50 rounded-md p-[0.5rem] justify-between items-center">
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
              className="mt-[1rem] mb-[1rem] bg-slate-800 p-[1rem] rounded-md shadow-2xl flex sm:flex-row sm: items-start sm:justify-start flex-col"
            >
              <div className="relative h-[12rem] sm:h-[15rem] sm:mr-[1rem] rounded-lg w-full">
                <Image
                  src={shoppingList[product].thumbnail}
                  fill
                  priority={false}
                  alt={shoppingList[product].title}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col w-full">
                <div>
                  <h1 className="text-lg sm:text-2xl">
                    {shoppingList[product].title}
                  </h1>
                  <h1 className="text-lg sm:text-2xl">
                    {shoppingList[product].brand}
                  </h1>
                </div>
                <div>
                  <div className="flex items-center">
                    <h1 className="mr-[0.5rem] text-lg text-blue-600">
                      Price:
                    </h1>
                    <h1>{shoppingList[product].price}$</h1>
                  </div>
                  <div className="flex items-center">
                    <h1 className="mr-[0.5rem] text-lg text-blue-600">
                      Discount:
                    </h1>
                    <h1> {shoppingList[product].discountPercentage}%</h1>
                  </div>
                  <div className="flex items-center">
                    <h1 className="mr-[0.5rem] text-lg text-blue-600">
                      Total :
                    </h1>
                    <h2>
                      {shoppingList[product].count *
                        shoppingList[product].price}
                      $
                    </h2>
                  </div>
                </div>
                <div className="flex flex-col self-center  items-center justify-center">
                  <h1 className="mr-[0.5rem] text-lg text-orange-600">
                    Total Items in the Cart
                  </h1>
                  <div className="flex items-center justify-center">
                    <button onClick={() => addProduct(shoppingList[product])}>
                      <i className="fa-solid text-4xl mr-[0.5rem] sm:hover:text-orange-500 duration-300 sm:hover:opacity-50 sm:text-5xl text-orange-600 fa-circle-plus"></i>
                    </button>
                    <h2 className="text-xl mr-[0.5rem] sm:text-2xl">
                      {shoppingList[product].count}
                    </h2>
                    <button
                      onClick={() => reduceProduct(shoppingList[product])}
                    >
                      <i className="fa-solid text-4xl text-blue-600 sm:hover:text-sky-500 duration-300 sm:hover:opacity-50 sm:text-5xl fa-circle-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="self-center flex justify-between w-full">
                  <button
                    onClick={() =>
                      handleClick(
                        shoppingList[product].category,
                        shoppingList[product].id
                      )
                    }
                    className="p-[0.2rem] w-[8rem] rounded-md mr-[0.5rem] sm:mt-[1.5rem] sm:p-[0.5rem] sm:text-xl sm:hover:opacity-50 duration-300 text-bold bg-cyan-600 mt-[0.7rem] text-center "
                  >
                    <i className="fa-solid fa-circle-info mr-[0.5rem]"></i>
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(shoppingList[product])}
                    className="p-[0.2rem] w-[8rem] rounded-md sm:mt-[1.5rem] sm:p-[0.5rem] sm:text-xl sm:hover:opacity-50 duration-300 text-bold bg-red-600 mt-[0.7rem] text-center"
                  >
                    Delete<i className=" ml-[0.5rem] fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
