import Link from 'next/link';
import { useState } from 'react';
import { useFormik } from 'formik';
import loginValidate from '../lib/validate';
import { useAuth } from '../context/ContextProvider';
import Image from 'next/image';
import bgImage from '../public/katsiaryna-endruszkiewicz-BteCp6aq4GI-unsplash.jpg';

interface Values {
  email: string;
  password: string;
}
export default function LoginForm() {
  const { login, error, set } = useAuth();
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: loginValidate,
    onSubmit,
  });

  function onSubmit(values: Values) {
    login(values.email, values.password);
  }

  return (
    <section className="w-[100vw] sm:w-[60rem]  min-h-screen flex items-center justify-center p-[0.5rem]">
      <div className="sm:h-[30rem] flex sm:shadow-2xl bg-none sm:bg-white rounded">
        <div className="relative  w-[20rem] hidden sm:block">
          <Image
            src={bgImage}
            fill
            alt="side picture"
            className="object-cover"
          ></Image>
        </div>
        <div className="sm:h-[100%] sm:p-[1rem] w-[100vw] p-[1rem] sm:w-[30rem]  flex flex-col sm:justify-center items-center">
          <h1 className="sm:mb-[1rem] text-xl  mb-[0.5rem] font-medium sm:text-3xl uppercase select-none">
            welcome back!
          </h1>
          <span className="mb-[1rem]">
            {error ? (
              <span className="text-xl text-red-400 sm:text-2xl">{error}</span>
            ) : (
              <></>
            )}
          </span>
          <form onSubmit={formik.handleSubmit} className="w-full mx-[0.5rem]">
            <div className="mb-[1rem] flex flex-col items-center">
              <input
                type="email"
                placeholder="Email"
                {...formik.getFieldProps('email')}
                className="w-full p-[0.5rem] sm:w-[24rem] bg-gray-200 rounded-lg focus:border-cyan-900 border-2 border-black/20 outline-none "
              />
              {formik.errors.email && formik.touched.email ? (
                <span className="text-red-500 w-full text-center">
                  {formik.errors.email}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="relative items-center flex flex-col mb-[1rem]">
              <input
                type={show ? 'text' : 'password'}
                placeholder="password"
                {...formik.getFieldProps('password')}
                className="w-full p-[0.5rem] sm:w-[24rem] bg-gray-200 rounded-lg focus:border-cyan-900 border-2 border-black/20 outline-none"
              />
              <div
                onClick={() => setShow(!show)}
                className="absolute top-1 cursor-pointer text-2xl sm:right-[3rem] text-zinc-200 right-[1rem]"
              >
                {show ? (
                  <i className="fa-solid fa-eye-slash text-black/80 text-sm"></i>
                ) : (
                  <i className="fa-sharp fa-solid fa-eye text-black/80 text-sm"></i>
                )}
              </div>
              {formik.errors.password && formik.touched.password ? (
                <span className="text-red-500 w-full text-center">
                  {formik.errors.password}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-[10rem] sm:w-[10rem] p-[0.5rem] mt-[1rem] sm:hover:bg-green-900 sm:hover:border-green-900 duration-300 sm:hover:text-white text-bold  uppercase duration-300 relative border-2 border-black "
              >
                <h1 className="relative z-20">Login</h1>
              </button>
            </div>
          </form>
          <div className="flex mt-[2rem]">
            <p className=" mr-[0.5rem] text-zinc-700">
              Don&#39;t have an account?
            </p>
            <Link
              href={'/register'}
              onClick={set}
              className="text-black font-bold"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
