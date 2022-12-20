import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="w-full text-xl  playfulFont bg-stone-900 text-white flex items-center justify-center p-[1rem]">
      <Link href="https://github.com/noobMushroom/shoping_cart.git">
        <i className="fa-brands fa-github-alt text-cyan-600 text-3xl mr-[1rem]"></i>
      </Link>
      &copy; Created by Mushroom
    </footer>
  );
}
