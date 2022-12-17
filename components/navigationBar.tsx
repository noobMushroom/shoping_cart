import Link from 'next/link';
import { useState } from 'react';
export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full fixed shadow-2xl top-0 left-0 bg-black/90 text-white sm:text-5xl justify-between flex items-center p-[0.5rem] sm:p-[1rem] text-xl text-black z-[999] pt-[1rem]">
      <div>
        <h1 className=" select-none text-2xl text-rose-600 uppercase sm:font-bold sm:text-6xl">
          Mushroom cart
        </h1>
      </div>
      <div className=" sm:w-[30rem] text-white flex items-center justify-between">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <i className="fa-solid fa-xmark hover:text-cyan-600 duration-300 sm:hidden fa-bars pr-[0.5rem] "></i>
          ) : (
            <i className="fa-sharp  fa-solid hover:text-cyan-600 duration-300 sm:hidden fa-bars pr-[0.5rem] "></i>
          )}
        </button>
        <button>
          <i className="fa-solid hidden hover:text-cyan-600 duration-300 hover:opacity-50 sm:block fa-cart-shopping "></i>
        </button>
        <button>
          <i className="fa-solid fa-user hover:text-cyan-600 duration-300 hidden sm:block  pr-[0.5rem]"></i>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-12  duration-300 sm:hidden text-black text-xl text-white flex flex-col items-center left-0 w-full bg-slate-900 flex-1 py-[1rem]">
          <button className="text-white my-[0.5rem]">Your profile</button>
          <Link className="my-[0.5rem] text-white" href={'/'}>
            Your cart
          </Link>
          <Link className="my-[0.5rem] text-white" href={'/'}>
            About us
          </Link>
          <button className="my-[0.5rem] text-white">logout</button>
        </div>
      )}
    </nav>
  );
}
