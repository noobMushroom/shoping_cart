import Image from 'next/image';
import Link from 'next/link';
import uuid from 'react-uuid';
import Slider from 'react-slick';
import Background from './StartScreen';
import { useRouter } from 'next/router';
import productImage1 from '../public/andrea-bertozzini-VoertyDYyjA-unsplash.jpg';
import productImage2 from '../public/irene-kredenets-dwKiHoqqxk8-unsplash.jpg';
import productImage3 from '../public/giorgio-trovato-K62u25Jk6vo-unsplash.jpg';
import productImage4 from '../public/wiser-by-the-mile-SwWCo1k92M4-unsplash.jpg';
import productImage5 from '../public/lukenn-sabellano-BJZeNGkGuaU-unsplash.jpg';
interface PropType {
  products: [
    {
      title: string;
      image: string;
      rating: { rate: number; count: number };
      price: number;
      description: string;
      id: string;
    }
  ];
}

export default function HomePage(props: PropType) {
  const router = useRouter();
  return (
    <div className="w-[100%]">
      <div>
        <Background />
      </div>
      <div className="sm:w-[90%] sm:mt-[5rem] sm:m-auto">
        <div className="text-center hidden sm:block">
          <div>
            <h1 className="capitalize text-bold text-4xl mb-[3rem]">
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
          <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[30rem] mb-[3rem]">
            <div className="relative col-start-1 col-end-4 row-start-1 row-end-4 shadow-xl cursor-pointer overflow-hidden">
              <Image
                src={productImage2}
                priority={false}
                alt={'sunglasses category'}
                fill
                className="object-cover hover:grayscale duration-300 hover:scale-110"
              />
            </div>
            <div className="relative col-start-1 col-end-4 row-start-4 row-end-7 shadow-xl cursor-pointer overflow-hidden">
              <Image
                src={productImage3}
                alt={'category'}
                fill
                priority={false}
                className="object-cover hover:grayscale duration-300 hover:scale-110"
              />
            </div>
            <div className="col-start-4 col-end-10 row-start-1 row-end-7 relative shadow-xl cursor-pointer overflow-hidden">
              <Image
                src={productImage1}
                alt={'clothing section'}
                fill
                priority={false}
                className="object-cover object-[50%_10%] hover:grayscale duration-300 hover:scale-110"
              />
            </div>
            <div className="relative col-start-10 col-end-13 row-start-1 overflow-hidden row-end-4 shadow-xl cursor-pointer">
              <Image
                src={productImage4}
                alt="category"
                priority={false}
                fill
                className="object-cover hover:grayscale duration-300 object-[50%_80%] hover:scale-110"
              />
            </div>
            <div className="col-start-10 col-end-13 row-start-4 row-end-7 relative shadow-xl cursor-pointer overflow-hidden">
              <Image
                src={productImage5}
                alt="category"
                fill
                priority={false}
                className="object-cover hover:grayscale duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
