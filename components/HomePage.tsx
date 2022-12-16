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
            <div>
              <button>
                <i className="fa-solid fa-circle-chevron-left"></i>
              </button>
              <button className="text-black ">
                <i className="fa-solid fa-circle-chevron-right"></i>
              </button>
            </div>
            <Link
              href={'/'}
              className="text-xl text-sky-900 font-bold underline flex items-center playfulFont capitalize mb-[0.3rem]"
            >
              <h1>{product.title}</h1>
            </Link>
            <div className="flex mx-[0.8rem] w-full overflow-hidden relative  flex items-center  self-center ">
              {product.url.map((img) => {
                return (
                  <div
                    key={uuid()}
                    className="relative sm:w-[30rem] sm:mx-[0.5rem] w-full h-[8rem] sm:h-[18rem] "
                  >
                    <Image
                      src={img}
                      priority={true}
                      alt=""
                      fill
                      className="object-cover sm:object-[50%_0%]"
                    />
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
