import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../context/ContextProvider';
import { useShoppingList } from '../context/ShoppingList';
export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false); // state to show and close navigation bar;
  const { shoppingList } = useShoppingList();
  const router = useRouter(); //router to push the links

  const { currentUser, logout } = useAuth(); // current logged in user;

  // handleclick function to push diffrent routes by button click
  function handleClick(link: string) {
    router.push(link);
  }

  return (
    <nav className="w-full fixed top-0 left-0 shadow-2xl top-0 left-0 bg-black/90 text-white sm:text-4xl justify-between flex items-center p-[0.5rem] sm:p-[1rem] text-xl text-black z-[999] pt-[1rem]">
      <div>
        <Link
          href={'/'}
          onClick={() => setIsOpen(false)}
          className=" select-none text-2xl text-rose-600 uppercase sm:font-bold sm:text-4xl"
        >
          Mushroom cart
        </Link>
      </div>
      <div className=" sm:w-[30rem] text-white flex items-center justify-between">
        {/* button to toggle menu */}
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <i className="fa-solid fa-xmark sm:hidden fa-bars pr-[0.5rem] "></i>
          ) : (
            <i className="fa-sharp  fa-solid sm:hidden fa-bars pr-[0.5rem] "></i>
          )}
        </button>

        {/* button for home */}
        <button onClick={() => handleClick('/')}>
          <i className="fa-solid fa-house hover:text-cyan-600 duration-300 hidden sm:block  pr-[0.5rem]"></i>
        </button>
        {/* button for cart */}
        <button onClick={() => handleClick('/cart')} className="relative">
          <i className="fa-solid hidden hover:text-cyan-600 duration-300 hover:opacity-50 sm:block fa-cart-shopping "></i>
          <h1 className="absolute hidden sm:block top-[-0.5rem] right-[-0.5rem] font-bold text-sm w-[1.5rem] h-[1.5rem] rounded-full bg-sky-600 flex items-center justify-center">
            {Object.keys(shoppingList).length}
          </h1>
        </button>

        {/* button for login */}
        <div className="flex items-center">
          <button
            onClick={
              currentUser
                ? () => handleClick('/userInfo')
                : () => handleClick('/login')
            }
          >
            <i className="fa-solid fa-user hover:text-cyan-600 duration-300 hidden sm:block  pr-[0.5rem]"></i>
          </button>
          <div className="ml-[0.5rem]">
            {currentUser ? (
              <span className="text-md hidden sm:block">
                {currentUser.displayName}
              </span>
            ) : (
              <span className="text-base  hidden sm:block">Guest</span>
            )}
          </div>
        </div>
        {/* div for responsive panel */}
      </div>
      {isOpen && (
        <div className="absolute top-12  duration-300 sm:hidden text-black text-xl text-white flex flex-col items-center left-0 w-full bg-slate-900 flex-1 py-[1rem]">
          <Link
            href={currentUser ? '/userInfo' : '/login'}
            className="text-white my-[0.5rem]"
            onClick={() => setIsOpen(false)}
          >
            {currentUser ? currentUser.displayName : 'Login'}
          </Link>
          <Link
            className="my-[0.5rem] flex items-center text-white"
            href={'/cart'}
            onClick={() => setIsOpen(false)}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <h1 className="ml-[0.5rem]">
              {Object.keys(shoppingList).length} items
            </h1>
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            className="my-[0.5rem] text-white"
            href={'/aboutUs'}
          >
            About us
          </Link>
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="my-[0.5rem] text-white"
          >
            {currentUser ? 'Logout' : <></>}
          </button>
        </div>
      )}
    </nav>
  );
}
