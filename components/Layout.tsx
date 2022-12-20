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
      <main className="w-full min-h-screen bg-stone-900 flex justify-center">
        {props.children}
      </main>
      <Footer />
    </Fragment>
  );
}
