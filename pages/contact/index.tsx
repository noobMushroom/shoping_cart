import Link from 'next/link';
export default function Contact() {
  return (
    <div className=" min-h-screen flex items-center sm:justify-center flex-col">
      <div className="sm:w-[60rem] mt-[5rem] sm:mt-0 sm:flex sm:flex-col sm:items-center sm:justify-center sm:bg-zinc-200 sm:h-[20rem] sm:shadow-2xl">
        <div className="sm:text-xl mb-[3rem] text-gray-700">
          <h1>You can contact us here</h1>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <i className="fa-solid fa-location-dot mr-3 text-gray-600"></i>
            <p>8 Selby Street Piqua, OH 45356</p>
          </div>
          <div className="flex items-center mb-2">
            <i className="fa-sharp fa-solid fa-phone mr-3 text-gray-600"></i>
            <h5>631-579-8458</h5>
          </div>
          <div className="flex items-center mb-2">
            <i className="fa-solid fa-at mr-3 text-gray-600"></i>
            <h5>mivecol397@khaxan.com</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
