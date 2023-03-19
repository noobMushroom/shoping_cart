import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="w-full text-xl bg-zinc-900 text-white flex flex-col items-center justify-center p-[1rem]">
      <div className="flex flex-col text-sm self-start">
        <Link href="/contact" className="sm:hidden">
          Contact
        </Link>
        <Link href="/aboutUs" className="sm:hidden">
          About us
        </Link>
      </div>
      <div className=" flex items-center text-base">
        &copy; Created by Mushroom
      </div>
    </footer>
  );
}
