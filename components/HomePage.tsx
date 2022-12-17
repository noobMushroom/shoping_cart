import Image from 'next/image';
import Link from 'next/link';
import uuid from 'react-uuid';
import Slider from 'react-slick';
import Background from './StartScreen';
interface PropType {
  products: [{ title: string; url: string[] }];
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick}>
      <i className="fa-solid  text-black absolute z-[10] top-[50%] left-[1rem] hidden sm:block sm:text-5xl fa-circle-chevron-left hover:text-cyan-900/90 duration-300"></i>
    </div>
  );
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick}>
      <i className="fa-solid absolute top-[50%] right-[1rem] text-black sm:text-5xl hidden sm:block fa-circle-chevron-right hover:text-cyan-900/90 duration-300"></i>
    </div>
  );
}

export default function HomePage(props: PropType) {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-[100%]">
      <div>
        <Background />
      </div>
      {props.products.map((product) => {
        return (
          <div
            key={uuid()}
            className="mb-[0.6rem] sm:w-[80%] m-auto relative justify-center flex flex-col border-b-2  py-[1rem] border-stone-900 "
          >
            <Link
              href={`/${product.title}`}
              className="text-xl text-sky-900 font-bold underline flex items-center playfulFont capitalize mb-[0.3rem]"
            >
              <h1>{product.title}</h1>
            </Link>
            <Slider {...settings}>
              {product.url.map((img) => {
                return (
                  <div
                    key={uuid()}
                    className="relative sm:mx-[1rem] h-[12rem] sm:h-[18rem]"
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover sm:object-[50%_50%]"
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        );
      })}
    </div>
  );
}
