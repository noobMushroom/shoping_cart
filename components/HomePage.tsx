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
            className="mb-[0.6rem] relative justify-center flex flex-col border-b-2  py-[1rem] border-stone-900 overflow-hidden"
          >
            {/* div to hold buttons for navigation */}
            <div className="absolute z-50 top-[50%] text-xl sm:text-5xl px-[0.5rem] text-blue-900 sm:px-[1rem] flex justify-between w-full">
              <button>
                <i className="fa-solid fa-circle-chevron-left hover:text-cyan-900/90 duration-300"></i>
              </button>
              <button>
                <i className="fa-solid fa-circle-chevron-right hover:text-cyan-900/90 duration-300"></i>
              </button>
            </div>
            {/* links for the category pages */}
            <Link
              href={'/'}
              className="text-xl text-sky-900 font-bold underline flex items-center playfulFont capitalize mb-[0.3rem]"
            >
              <h1>{product.title}</h1>
            </Link>
            <div className="flex mx-[0.8rem] min-w-full overflow-hidden relative flex items-center self-center">
              {product.url.map((img) => {
                return (
                  <div
                    key={uuid()}
                    className="relative -z-20 min-w-full sm:min-w-[30rem] sm:mx-[0.5rem] h-[8rem] sm:h-[18rem] "
                  >
                    <Image
                      src={img}
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
