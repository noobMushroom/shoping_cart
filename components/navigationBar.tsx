import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, Fragment } from 'react';
import { useAuth } from '../context/ContextProvider';
import uuid from 'react-uuid';
import { useShoppingList } from '../context/ShoppingList';

export default function NavigationBar() {
  const [categoreis, setCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false); // state to show and close navigation bar;
  const [loading, setLoading] = useState(true);
  const { shoppingList } = useShoppingList();
  const [drpDown, setDrpDown] = useState(false);
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
    <nav className="w-full h-[3.5rem] sm:h-[5rem] justify-between fixed top-0 left-0 shadow-xl top-0 left-0 bg-zinc-100/90 text-black flex items-center p-[0.5rem] sm:p-[1rem] text-xl text-black z-[1000] pt-[1rem]">
      <div>
        <Link
          href={'/'}
          onClick={() => setIsOpen(false)}
          className=" select-none text-base font-bold text-rose-600 uppercase sm:text-xl"
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
        <button onClick={() => setDrpDown(!drpDown)} className="relative">
          <h1 className="hover:text-rose-600 flex itmes-center text-sm uppercase duration-100 hidden sm:block font-semibold">
            shop
            {drpDown ? (
              <i className="fa-solid fa-chevron-up ml-[0.3rem]"></i>
            ) : (
              <i className="fa-solid ml-[0.3rem] fa-chevron-down"></i>
            )}
          </h1>
          {drpDown ? (
            <Fragment>
              <i className="fa-sharp fa-solid fa-caret-up absolute top-[2.4rem] left-[30%] text-red-600 "></i>
              <ul className="absolute grid grid-cols-4 gap-6 items-center  durtaion-300 justify-center p-10 top-[3.1rem] dropdown__menu w-[45rem] border-t-4 border-red-600 bg-zinc-100 shadow-2xl rounded left-[-20rem]">
                {categoreis.map((cat) => {
                  return (
                    <li
                      className="text-sm capitalize hover:text-red-600 duration-300"
                      key={uuid()}
                    >
                      <Link href={`/${cat}`}>{cat}</Link>
                    </li>
                  );
                })}
              </ul>
            </Fragment>
          ) : (
            <></>
          )}
        </button>
        <li>
          <Link
            href="/contact"
            className="hover:text-rose-600 text-sm uppercase duration-100 font-semibold hidden sm:block"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/aboutUs"
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
        <div className="flex items-center hidden sm:block">
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
        <div className="absolute top-12 duration-300 sm:hidden text-black flex flex-col items-center left-0 w-full bg-zinc-200 flex-1 p-[0.5rem]">
          <div className="flex text-base w-full justify-around">
            <Link
              href={currentUser ? '/userInfo' : '/login'}
              className=" my-[0.5rem]"
              onClick={() => setIsOpen(false)}
            >
              {currentUser ? currentUser.displayName : 'Login'}
            </Link>
            <Link
              className="my-[0.5rem] flex items-center"
              href={'/cart'}
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <h1 className="ml-[0.5rem]">
                {Object.keys(shoppingList).length} Items
              </h1>
            </Link>
          </div>
          <div className="w-full">
            <h1 className="text-base text-bold text-gray-700">Categories</h1>
            <ul className="grid grid-cols-2 text-sm mt-4 gap-y-4 items-center justify-center">
              {categoreis.map((item, index) => {
                return (
                  <li onClick={() => setIsOpen(!isOpen)} key={index}>
                    <Link href={`/${item}`}>{item}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
