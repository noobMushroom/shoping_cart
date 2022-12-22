import { useFormik } from 'formik';
import { useState } from 'react';
import Link from 'next/link';
import { registrationValidation } from '../lib/validate';
import { useAuth } from '../context/ContextProvider';
import Image from 'next/image';
import bgImage from '../public/dom-hill-nimElTcTNyY-unsplash.jpg';

interface Values {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function RegisterPage() {
  const { signup, error, set } = useAuth();
  const [show, setShow] = useState({ password: false, confirmPassword: false });
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: registrationValidation,
    onSubmit,
  });
  async function onSubmit(values: Values) {
    signup(values.email, values.password, values.username);
  }

  return (
    <section className="w-[100vw] sm:w-[50rem] min-h-screen flex flex-col items-center justify-center p-[0.5rem] sm:my-[1rem]">
      <div className="flex sm:h-[35rem] sm:w-full sm:bg-white sm:rounded sm:m-auto">
        <div className="relative hidden sm:block h-[35rem] w-[30rem]">
          <Image
            src={bgImage}
            fill
            priority={false}
            alt="side pic"
            className="object-cover object-center"
          ></Image>
        </div>
        <div className="text-black sm:w-full sm:p-[1rem] flex flex-col items-center justify-center">
          <h1 className="mb-[1rem] sm:text-2xl sm:font-medium select text-zinc-700 none uppercase font-bold text-xl">
            create your account
          </h1>
          {error ? (
            <span className="text-xl text-red-500 mb-[0.5rem] sm:text-sm">
              {error}
              <Link
                href={'/login'}
                onClick={set}
                className="ml-[0.5rem] font-bold"
              >
                Login
              </Link>
            </span>
          ) : (
            <></>
          )}
          <form
            onSubmit={formik.handleSubmit}
            className="w-full sm:flex sm:flex-col sm:items-center mx-[0.5rem]"
          >
            <div className="flex flex-col mb-[1rem]">
              <input
                type="text"
                placeholder="Username"
                {...formik.getFieldProps('username')}
                className="w-full p-[0.5rem] sm:w-[24rem] bg-gray-200 rounded-lg focus:border-cyan-900 border-2 border-black/20 outline-none "
              />
              {formik.errors.username && formik.touched.username ? (
                <span className="text-red-500 text-sm w-full text-center">
                  {formik.errors.username}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col mb-[1rem] ">
              <input
                type="email"
                placeholder="something@gmail.com"
                {...formik.getFieldProps('email')}
                className="w-full p-[0.5rem] sm:w-[24rem] bg-gray-200 rounded-lg focus:border-cyan-900 border-2 border-black/20 outline-none "
              />
              {formik.errors.email && formik.touched.email ? (
                <span className="text-red-500 w-full text-sm text-center">
                  {formik.errors.email}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="relative mb-[1rem] flex flex-col">
              <input
                type={show.password ? 'text' : 'password'}
                placeholder="password"
                required
                {...formik.getFieldProps('password')}
                className="w-full p-[0.5rem] sm:w-[24rem] bg-gray-200 rounded-lg focus:border-cyan-900 border-2 border-black/20 outline-none"
              />
              <div
                onClick={() => setShow({ ...show, password: !show.password })}
                className="absolute top-1 cursor-pointer text-2xl right-[1rem] text-zinc-200"
              >
                {show.password ? (
                  <i className="fa-solid fa-eye-slash text-black/80 text-sm"></i>
                ) : (
                  <i className="fa-sharp fa-solid fa-eye text-black/80 text-sm"></i>
                )}
              </div>
              {formik.errors.password && formik.touched.password ? (
                <span className="text-red-500 w-full text-sm text-center">
                  {formik.errors.password}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="relative mb-[1rem] flex flex-col">
              <input
                type={show.confirmPassword ? 'text' : 'password'}
                placeholder=" confirm password"
                required
                {...formik.getFieldProps('confirmPassword')}
                className="w-full p-[0.5rem] sm:w-[24rem] bg-gray-200 rounded-lg focus:border-cyan-900 border-2 border-black/20 outline-none"
              />
              <div
                onClick={() =>
                  setShow({ ...show, confirmPassword: !show.confirmPassword })
                }
                className="absolute top-1 right-[1rem] cursor-pointer  text-2xl text-zinc-200 "
              >
                {show.confirmPassword ? (
                  <i className="fa-solid fa-eye-slash text-black/80 text-sm"></i>
                ) : (
                  <i className="fa-sharp fa-solid fa-eye text-black/80 text-sm"></i>
                )}
              </div>
              {formik.errors.confirmPassword &&
              formik.touched.confirmPassword ? (
                <span className="text-red-500 w-full text-sm text-center">
                  {formik.errors.confirmPassword}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-[10rem] sm:w-[10rem] p-[0.5rem] mt-[1rem] bg-green-900 sm:hover:bg-cyan-900 sm:hover:border-cyan-900 text-white duration-300 text-bold uppercase relative border-2 border-green-900 "
              >
                <h1 className="relative z-20">Register</h1>
              </button>
            </div>
          </form>
          <div className="flex mt-[2rem]">
            <p className="text-zinc-700 mr-[0.5rem]">Already have an account</p>
            <Link href={'/login'} onClick={set} className="font-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
