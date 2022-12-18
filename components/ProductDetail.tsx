import Image from 'next/image';
import uuid from 'react-uuid';
import Slider from 'react-slick';
import { Props } from '../pages/[cat]/[id]';
import Stars from './Ratings';
// fucntions for the arrow of slider
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
export default function ProductDetails(data: Props) {
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
    <div className="sm:w-[80%] w-full p-[0.5rem] text-white mt-0 min-h-screen mt-[1rem]">
      <div className="text-center">
        <strong className="capitalize text-xl sm:text-4xl sm:my-[1rem] playfulFont">
          {data.data.title}
        </strong>
        <h1 className="playfulFont sm:text-3xl sm:mb-[1rem] my-[0.5rem]">
          {data.data.brand}
        </h1>
      </div>
      <Slider {...settings}>
        {data.data.images.map((image) => {
          return (
            <div
              key={uuid()}
              className="relative sm:mx-[1rem] h-[12rem] sm:h-[18rem]"
            >
              <Image
                src={image}
                alt={data.data.title}
                fill
                className="object-cover object-[50%_0%]"
              />
            </div>
          );
        })}
      </Slider>
      <div>
        <h1 className="playfulFont text-xl sm:text-2xl sm:font-semibold my-[0.5rem] px-[1rem]">
          {data.data.category}
        </h1>
      </div>
      <div>
        <p className="playfulFont my-[0.2rem] px-[1rem] sm:text-xl">
          {data.data.description}
        </p>
      </div>
      <div className=" my-[0.2rem] px-[1rem] sm:text-xl">
        <h3>Price: {data.data.price}$</h3>
        <h3>Discount: {data.data.discountPercentage}%</h3>
        <h3>Stock: {data.data.stock}</h3>
      </div>
      <div className="my-[0.2rem] px-[1rem]">
        <Stars num={data.data.rating} />
      </div>
      <div className="flex items-center ml-[1rem] sm:my-[1rem] ">
        <button>
          <i className="fa-solid text-4xl mr-[0.5rem] sm:hover:text-orange-500 duration-300 sm:hover:opacity-50 sm:text-5xl text-orange-600 fa-circle-plus"></i>
        </button>
        <h1 className="text-4xl mr-[0.5rem] sm:text-5xl">0</h1>
        <button>
          <i className="fa-solid text-4xl text-blue-600 sm:hover:text-sky-500 duration-300 sm:hover:opacity-50 sm:text-5xl fa-circle-minus"></i>
        </button>
      </div>
    </div>
  );
}
