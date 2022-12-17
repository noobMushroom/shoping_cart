import { useEffect, useState } from 'react';

export default function Background() {
  const [urls, setUrls] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(1);

  // getting picutres url
  useEffect(() => {
    const url = `https://api.unsplash.com/search/photos/?client_id=${
      process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    }&query=shopping&per_page=30&order_by=popular&orientation=landscape&page=${
      Math.floor(Math.random() * 2) + 1
    }`;

    const picturesData = async () => {
      setUrls(['']);
      try {
        const data = await fetch(url).then((res) => res.json());
        data.results.map((pic: any) =>
          setUrls((perv) => [...perv, pic.urls.regular])
        );
      } catch (err) {
        console.log(err);
      }
    };
    picturesData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide === 30) {
        setCurrentSlide(1);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const bgImage = {
    backgroundImage: `url(${urls[currentSlide]})`,
  };

  return (
    <div>
      <div
        style={bgImage}
        className="w-full relative bg-no-repeat bg-cover playfulFont h-screen flex items-center justify-center duration-300 transistion ease-in "
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
            Place for Everyone
          </p>
        </div>
      </div>
    </div>
  );
}
