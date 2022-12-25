import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="w-full text-xl bg-zinc-900 text-white flex flex-col items-center justify-center p-[1rem]">
      <div>
        <Link href="/contact" className="sm:hidden">
          Contact
        </Link>
        <Link href="/aboutUs" className="sm:hidden">
          About us
        </Link>
      </div>
      <div className=" flex items-center text-base">
        <Link href="https://github.com/noobMushroom/shoping_cart.git">
          <i className="fa-brands fa-github-alt text-cyan-600 text-xl mr-[1rem]"></i>
        </Link>
        &copy; Created by Mushroom
      </div>
    </footer>
  );
}
