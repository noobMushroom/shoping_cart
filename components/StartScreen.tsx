import { useRouter } from 'next/router';
import Image from 'next/image';
import bgImage from '../public/two-friends-chilling-white-floor-studio.jpg';

export default function Background() {
  const router = useRouter();
  const handleClick = (link: string) => {
    router.push(link);
  };
  return (
    <div className="text-stone-900">
      <div className="w-full flex-col relative playfulFont h-screen flex justify-center duration-300 transistion ease-in ">
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/1" />
        <div className="absolute top-0 left-0 right-0 bottom-0 ">
          <div className="relative w-full h-full">
            <Image
              src={bgImage}
              alt="pictures"
              fill
              priority={false}
              className="object-cover duration-300 transistion ease-in object-[43%_10%] sm:object-[50%_40%]"
            />
          </div>
        </div>
        <div className="flex flex-col sm:ml-[2rem] z-50 ">
          <div className="mb-[2rem] sm:ml-[3rem] sm:mb-[4rem]">
            <h3 className="sm:text-2xl text-xl  text-center sm:text-start uppercase select-none font-semibold sm:font-bold">
              new arrivals
            </h3>
            <h1 className="sm:text-6xl text-[#1d1b28] sm:font-black font-black text-2xl text-center mt-[1rem] sm:text-start uppercase">
              Amazing winter collection
            </h1>
            <p className="text-xs select-none  mt-[1rem] hidden sm:block sm:text-sm italic sm:w-[35rem]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco labori
            </p>
          </div>
          <div className="self-center sm:self-start sm:mt-[0] mt-[4rem]">
            <button
              onClick={() => handleClick('#start')}
              className="sm:w-[8rem] sm:ml-[3rem] sm:hover:shadow-2xl sm:p-[1rem] uppercase p-[0.8rem] font-bold text-lg sm:text-base sm:hover:bg-stone-900 sm:duration-300 sm:hover:text-white border-2 border-stone-900"
            >
              shop now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
