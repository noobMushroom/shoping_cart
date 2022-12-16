import Image from 'next/image';
import Link from 'next/link';
import uuid from 'react-uuid';
interface PropType {
  products: [{ title: string; url: string[] }];
}
export default function HomePage(props: PropType) {
  return (
    <div className="w-[100%] ">
      {props.products.map((product) => {
        return (
          <div
            key={uuid()}
            className="mb-[0.6rem] justify-center flex flex-col border-b-2 py-[1rem] border-stone-900 overflow-hidden"
          >
            <Link
              href={'/'}
              className="text-xl text-sky-900 font-bold underline flex items-center playfulFont capitalize mb-[0.3rem]"
            >
              <h1>{product.title}</h1>
            </Link>
            <div className="flex relative w-full flex items-center justify-center self-center ">
              {product.url.map((img) => {
                return (
                  <div
                    key={uuid()}
                    className="relative sm:w-[30rem] w-full h-[8rem] sm:h-[18rem] "
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
