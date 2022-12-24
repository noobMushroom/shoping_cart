import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/ContextProvider';
import uuid from 'react-uuid';
import { useShoppingList } from '../context/ShoppingList';

export default function NavigationBar() {
  const [categoreis, setCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false); // state to show and close navigation bar;
  const [loading, setLoading] = useState(true);
  const { shoppingList } = useShoppingList();
  const router = useRouter(); //router to push the links
  const { currentUser, logout } = useAuth(); // current logged in user;

  useEffect(() => {
    const url = 'https://dummyjson.com/products/categories';
    const catData = async () => {
      try {
        const data = await fetch(url);
        const res = await data.json();
        setCategories(res);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    catData();
  }, []);

  // handleclick function to push diffrent routes by button click
  function handleClick(link: string) {
    router.push(link);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <nav className="w-full h-[3.5rem] sm:h-[5rem] fixed top-0 left-0 shadow-xl top-0 left-0 bg-zinc-100/90 text-black flex items-center p-[0.5rem] sm:p-[1rem] text-xl text-black z-[1000] pt-[1rem]">
      <div>
        <Link
          href={'/'}
          onClick={() => setIsOpen(false)}
          className=" select-none text-2xl text-rose-600 uppercase sm:font-bold sm:text-xl"
        >
          Simply Stylish
        </Link>
      </div>
      <ul className="sm:m-auto sm:grow h-[100%] flex items-center justify-around">
        {/* button to toggle menu */}
        <li>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <i className="fa-solid fa-xmark sm:hidden fa-bars pr-[0.5rem] "></i>
            ) : (
              <i className="fa-sharp  fa-solid sm:hidden fa-bars pr-[0.5rem] "></i>
            )}
          </button>
        </li>

        <li>
          <Link
            href="/"
            className="hover:text-rose-600 text-sm uppercase duration-100 hidden sm:block font-semibold"
          >
            Home
          </Link>
        </li>
        <li className="relative">
          <Link
            href="/"
            className="hover:text-rose-600 flex itmes-center text-sm uppercase duration-100 hidden sm:block font-semibold"
          >
            shop
            <i className="fa-solid ml-[0.3rem] fa-chevron-down"></i>
          </Link>
          <i className="fa-sharp fa-solid fa-caret-up absolute top-[2.4rem] left-[30%] text-red-600"></i>
          <ul className="absolute grid grid-cols-4 gap-6 items-center justify-center p-10 top-[3.1rem] w-[45rem] border-t-4 border-red-600 bg-zinc-100 shadow-2xl rounded left-[-20rem]">
            {categoreis.map((cat) => {
              return (
                <li
                  className="text-sm capitalize hover:text-red-600"
                  key={uuid()}
                >
                  <Link href={`/${cat}`}>{cat}</Link>
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          <Link
            href="/"
            className="hover:text-rose-600 text-sm uppercase duration-100 font-semibold hidden sm:block"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="hover:text-rose-600 text-sm uppercase duration-100 font-semibold  hidden sm:block"
          >
            About
          </Link>
        </li>
        {/* button for cart */}
        <button onClick={() => handleClick('/cart')} className="relative">
          <i className="fa-solid hidden hover:text-red-600 duration-300 sm:block fa-cart-shopping "></i>
          <h1 className="absolute hidden sm:block top-[-1.1rem] right-[-1.1rem] font-bold text-sm w-[1.2rem] text-white h-[1.2rem] rounded-full bg-red-600 flex items-center justify-center">
            {Object.keys(shoppingList).length}
          </h1>
        </button>

        {/* button for login */}
        <div className="flex items-center">
          <div className="ml-[0.5rem]">
            {currentUser ? (
              <button onClick={() => handleClick('/userInfo')}>
                <i className="fa-solid fa-user hover:text-red-600 duration-300 hidden sm:block"></i>
              </button>
            ) : (
              <button
                onClick={() => handleClick('/login')}
                className="uppercase text-sm w-[7rem] mr-auto hover:text-red-600 hover:border-red-600 font-bold hidden sm:block border-2 border-zinc-900  p-[0.5rem]"
              >
                login
              </button>
            )}
          </div>
        </div>
        {/* div for responsive panel */}
      </ul>
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
