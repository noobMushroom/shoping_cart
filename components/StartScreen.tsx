import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface images {
  url: string;
}
export default function Background() {
  const [urls, setUrls] = useState<images[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setIsLoading] = useState(true);

  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(link);
  };

  // getting picutres url
  useEffect(() => {
    const url = `https://api.unsplash.com/search/photos/?client_id=${
      process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    }&query=shopping&per_page=30&order_by=popular&orientation=landscape&page=${
      Math.floor(Math.random() * 2) + 1
    }`;

    const picturesData = async () => {
      try {
        const data = await fetch(url).then((res) => res.json());
        const formattedData = data.results.map((pic: any) => ({
          url: pic.urls.regular,
        }));
        setUrls(formattedData);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    picturesData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide === 29) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  if (loading)
    return (
      <div className="w-[100vw] min-h-screen flex items-center justify-center">
        <i className="fa-solid animate-spin fa-spinner-third text-8xl"></i>
      </div>
    );
  const bgImage = {
    backgroundImage: `url(${urls[currentSlide].url})`,
  };

  return (
    <div>
      <div
        style={bgImage}
        className="w-full flex-col relative bg-no-repeat object-center bg-cover playfulFont h-screen flex items-center justify-center duration-300 transistion ease-in "
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50" />
        <div className="flex flex-col p-[0.5rem] items-center z-50 justify-center">
          <div className="mb-[2rem] sm:mb-[4rem]">
            <strong className="sm:text-8xl text-4xl text-white uppercase select-none text-zinc-100  underline  font-bold">
              Mushroom
            </strong>
          </div>
          <strong className="text-2xl text-center select-none mb-[2rem] sm:text-7xl text-white">
            Come to Life. Come to Shopping.
          </strong>
          <p className="text-white text-xl select-none  mt-[1rem] sm:text-4xl italic">
            Start building your dream cart today!
          </p>
          <div>
            <button
              onClick={() => handleClick('#start')}
              className="mt-[3rem] shadow-2xl sm:text-2xl sm:p-[0.8rem] sm:font-bold bg-cyan-600 p-[0.5rem] rounded-md text-xl text-white duration-300 relative sm:after:absolute after:top-0 after:right-full sm:after:bg-rose-600 z-50 after:-z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-black"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
