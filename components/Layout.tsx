import NavigationBar from './navigationBar';
import { Fragment } from 'react';
import Footer from './Footer';
interface layoutProps {
  children: React.ReactNode;
}
export default function Layout(props: layoutProps) {
  return (
    <Fragment>
      <header className="relative flex flex-col justify-center">
        <NavigationBar />
      </header>
      <main className="w-full bg-gray-200 mt-[5rem]">{props.children}</main>
      <Footer />
    </Fragment>
  );
}
