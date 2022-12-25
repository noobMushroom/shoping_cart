import Image from 'next/image';
import uuid from 'react-uuid';
import { useRouter } from 'next/router';
import { useShoppingList } from '../context/ShoppingList';
import { DataProps } from '../pages/[cat]';

export default function ProductPage(props: DataProps) {
  const router = useRouter();
  const { shoppingList, addProduct, reduceProduct } = useShoppingList(); // accessing functions to update product values;

  // this fucntion push the route and take two parameters category of the product and name of the product
  function handleClick(category: string, id: number) {
    router.push(`/${category}/${id}`);
  }

  return (
    <div className="pt-[0.5rem] pb-[2rem]">
      <div className=" text-center sm:text-4xl sm:my-[1.5rem] text-2xl my-[1rem] capitalize font-bold">
        {props.name}
      </div>
      {props.data.map((product) => {
        return (
          <div
            key={uuid()}
            className=" flex flex-col sm:flex-row shadow-2xl w-[95vw] sm:my-[2rem] sm:p-[2rem] sm:w-[70vw] rounded-lg p-[0.5rem] my-[1rem] m-auto bg-gray-100 items-center"
          >
            <div className="relative bg-white h-[12rem] sm:h-[15rem] sm:mr-[1rem] w-full">
              <Image
                src={product.thumbnail}
                fill
                priority={false}
                alt={product.title}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col w-full mt-4 sm:mt-0 sm:pl-[1rem]">
              <strong className="text-xs text-gray-700">{product.brand}</strong>
              <h1 className="text-xl sm:text-2xl font-semibold mt-[0.2rem]">
                {product.title}
              </h1>
              <div>
                <h1 className="font-bold text-2xl sm:text-4xl my-2 text-red-600">
                  {new Intl.NumberFormat('en-us', {
                    style: 'currency',
                    currency: 'usd',
                  }).format(product.price)}
                </h1>
              </div>
              <div className="flex my-[0.5rem] items-center sm:my-[1rem] sm:justify-start gap-4 sm:gap-10 ">
                <div className="flex items-center text-black sm:text-2xl shadow-lg w-[8rem] h-[3rem] sm:h-[2.5rem] border-2 border-black justify-evenly">
                  <button
                    onClick={() => addProduct(product)}
                    className="border-r-2 border-black bg-red-700 sm:bg-transparent sm:hover:text-red-600 text-center h-[100%] w-full"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <span className="w-full text-center h-[100%] flex items-center justify-center">
                    {shoppingList[product.title] ? (
                      <h1>{shoppingList[product.title].count}</h1>
                    ) : (
                      <h1>0</h1>
                    )}
                  </span>
                  <button
                    onClick={() => reduceProduct(product)}
                    className="border-l-2 bg-blue-700 sm:bg-transparent border-black sm:hover:text-red-600 w-full h-[100%] text-center"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleClick(product.category, product.id)}
                    className=" uppercase font-bold h-[3rem] sm:h-[2.5rem] px-[0.5rem] border-2 border-black text-sm sm:hover:bg-gray-800 sm:hover:text-white sm:hover:border-gray-800 duration-300"
                  >
                    <i className="fa-solid fa-info mr-4"></i>
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

//onClick={() => handleClick(product.category, product.id)}
//<i className="fa-solid fa-minus"></i>
