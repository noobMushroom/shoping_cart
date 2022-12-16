import NavigationBar from './navigationBar';
import background from '../public/pexels-cup-of-couple-6956903.jpg';
import Image from 'next/image';
import { Fragment } from 'react';
interface layoutProps {
  children: React.ReactNode;
}
export default function Layout(props: layoutProps) {
  return (
    <Fragment>
      <header className="relative  flex flex-col justify-center">
        <div className="bgGradient absolute h-[8rem] sm:h-[15rem] -z-20 top-0 left-0 w-full"></div>
        <div>
          <Image
            src={background}
            alt="background image"
            fill
            className="select-none object-cover sm:object-[50%_60%] -z-50"
          />
        </div>
        <NavigationBar />
      </header>
      <main className="w-full p-[0.5rem] sm:w-[80%] m-auto flex justify-center">
        {props.children}
      </main>
    </Fragment>
  );
}
