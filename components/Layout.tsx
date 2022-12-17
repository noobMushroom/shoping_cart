import NavigationBar from './navigationBar';
import background from '../public/pexels-cup-of-couple-6956903.jpg';
import Image from 'next/image';
import { Fragment } from 'react';
import Background from './StartScreen';
interface layoutProps {
  children: React.ReactNode;
}
export default function Layout(props: layoutProps) {
  return (
    <Fragment>
      <header className="relative flex flex-col justify-center">
        <NavigationBar />
      </header>
      <main className="w-full flex justify-center">{props.children}</main>
    </Fragment>
  );
}
