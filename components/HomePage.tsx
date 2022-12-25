import Image from 'next/image';
import { useShoppingList } from '../context/ShoppingList';
import { homeProps } from '../pages';
import Background from './StartScreen';
import { useRouter } from 'next/router';
import productImage1 from '../public/andrea-bertozzini-VoertyDYyjA-unsplash.jpg';
import productImage2 from '../public/irene-kredenets-dwKiHoqqxk8-unsplash.jpg';
import productImage3 from '../public/giorgio-trovato-K62u25Jk6vo-unsplash.jpg';
import productImage4 from '../public/wiser-by-the-mile-SwWCo1k92M4-unsplash.jpg';
import productImage5 from '../public/lukenn-sabellano-BJZeNGkGuaU-unsplash.jpg';

export default function HomePage(props: homeProps) {
  const router = useRouter();
  const { addProduct, reduceProduct, shoppingList } = useShoppingList();
  return (
    <div className="w-[100%] pb-[1rem]">
      <div>
        <Background />
      </div>
      <div className="sm:w-[90%] select-none sm:mt-[5rem] sm:m-auto">
        <div className="text-center hidden sm:block">
          <div>
            <h1 id="start" className="capitalize text-bold text-4xl mb-[2rem]">
              Welcome to simply stylish
            </h1>
          </div>
          <div className="mb-[4rem]">
            <p className="w-[80%] m-auto text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Senectus et netus et malesuada fames ac turpis egestas sed. Velit
              ut tortor pretium viverra. Duis ultricies lacus sed turpis
              tincidunt id aliquet. Venenatis a condimentum vitae sapien
              pellentesque habitant morbi tristique senectus.
            </p>
          </div>
          <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[30rem] mb-[6rem]">
            <div
              onClick={() => router.push('/womens-shoes')}
              className="relative col-start-1 col-end-4 row-start-1 row-end-4 shadow-xl cursor-pointer overflow-hidden"
            >
              <Image
                src={productImage2}
                priority={false}
                alt={'sneakers'}
                fill
                className="object-cover hover:grayscale duration-300 hover:scale-110"
              />
            </div>
            <div
              onClick={() => router.push('/sunglasses')}
              className="relative col-start-1 col-end-4 row-start-4 row-end-7 shadow-xl cursor-pointer overflow-hidden"
            >
              <Image
                src={productImage3}
                alt={'sungalsses'}
                fill
                priority={false}
                className="object-cover hover:grayscale duration-300 hover:scale-110"
              />
            </div>
            <div
              onClick={() => router.push('/womens-dresses')}
              className="col-start-4 col-end-10 row-start-1 row-end-7 relative shadow-xl cursor-pointer overflow-hidden"
            >
              <Image
                src={productImage1}
                alt={'clothing section'}
                fill
                priority={false}
                className="object-cover object-[50%_10%] hover:grayscale duration-300 hover:scale-110"
              />
            </div>
            <div
              onClick={() => router.push('/womens-bags')}
              className="relative col-start-10 col-end-13 row-start-1 overflow-hidden row-end-4 shadow-xl cursor-pointer"
            >
              <Image
                src={productImage4}
                alt="hand bags"
                priority={false}
                fill
                className="object-cover hover:grayscale duration-300 object-[50%_80%] hover:scale-110"
              />
            </div>
            <div
              onClick={() => router.push('/smartphones')}
              className="col-start-10 col-end-13 row-start-4 row-end-7 relative shadow-xl cursor-pointer overflow-hidden"
            >
              <Image
                src={productImage5}
                alt="smartphones"
                fill
                priority={false}
                className="object-cover hover:grayscale duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-[1rem] sm:w-[90%] select-none m-auto">
        <div className="text-center">
          <h1 className=" text-2xl sm:text-4xl sm:mb-[2rem]">
            Latest Arrivals
          </h1>
          <p className="sm:w-[60%] sm:m-auto text-sm text-gray-700 hidden sm:block">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="grid grid-cols-2 mt-[2rem] p-[1rem] gap-x-4  gap-y-6 sm:gap-x-6 sm:gap-y-8 sm:mt-[4rem] sm:grid-cols-4">
          {props.products.map((product) => {
            return (
              <div key={product.id}>
                <div
                  onClick={() => router.push(`/latest/${product.id}`)}
                  className="relative h-[15rem] sm:h-[20rem] mb-[0.4rem] cursor-pointer bg-white sm:w-full sm:p-[1rem]"
                >
                  {product.images.map((el) => {
                    return (
                      <Image
                        key={product.id}
                        src={el}
                        alt={product.title}
                        fill
                        priority={false}
                        className="object-contain"
                      />
                    );
                  })}
                  <div className="z-[999] font-black text-xl bg-black/20 sm:opacity-0 sm:bg-neutral-900/80 flex duration-300 ease-in-out hover:opacity-100 items-end justify-center top-0 left-0 right-0 bottom-0 absolute">
                    <div className="flex items-center text-black sm:text-white mb-[1.5rem] sm:mb-[3rem] shadow-2xl w-[6rem] sm:h-[2rem] border-2  border-black sm:border-white justify-evenly">
                      <button
                        onClick={() => addProduct(product)}
                        className="border-r-2 border-black bg-red-700 text-white sm:bg-transparent sm:border-white sm:hover:text-red-600 text-center h-[100%] w-full"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <h1 className="w-full text-center h-[100%]">
                        {shoppingList[product.title] ? (
                          <h1>{shoppingList[product.title].count}</h1>
                        ) : (
                          <h1>0</h1>
                        )}
                      </h1>
                      <button
                        onClick={() => reduceProduct(product)}
                        className="border-l-2 bg-blue-700 text-white sm:bg-transparent border-black sm:border-white sm:hover:text-red-600 w-full h-[100%] text-center"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-700">{product.category}</h3>
                </div>
                <div>
                  <h1 className="text-sm font-black">{product.title}</h1>
                </div>
                <div>
                  <h1 className="font-bold text-red-600">
                    {new Intl.NumberFormat('en-us', {
                      style: 'currency',
                      currency: 'usd',
                    }).format(product.price)}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
