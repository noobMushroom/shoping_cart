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
      <main className="w-full mb-0 bg-gray-200 mt-[3.5rem] sm:mt-[5rem]">
        {props.children}
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
}
