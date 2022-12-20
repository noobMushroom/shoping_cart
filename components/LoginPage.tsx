import Link from 'next/link';
import { useState } from 'react';
import { useFormik } from 'formik';
import loginValidate from '../lib/validate';
import { useAuth } from '../context/ContextProvider';

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
    <section className="w-[100vw] sm:w-full  min-h-screen flex flex-col items-center justify-center p-[0.5rem]">
      <h1 className="text-white sm:mb-[4rem] sm:text-5xl  mb-[3rem] font-bold text-3xl playfulFont">
        Login
      </h1>
      <span className="mb-[1rem]">
        {error ? (
          <span className="text-xl text-red-400 sm:text-2xl">{error}</span>
        ) : (
          <></>
        )}
      </span>
      <form onSubmit={formik.handleSubmit} className="w-full mx-[0.5rem]">
        <div className="mb-[1rem] flex flex-col">
          <input
            type="email"
            placeholder="Email"
            {...formik.getFieldProps('email')}
            className="w-full  p-[0.5rem] rounded-lg focus:border-cyan-600 outline-none text-white playfulFont bg-slate-900 border-4 text-xl border-zinc-500"
          />
          {formik.errors.email && formik.touched.email ? (
            <span className="text-red-500 w-full text-center">
              {formik.errors.email}
            </span>
          ) : (
            <></>
          )}
        </div>
        <div className="relative flex flex-col mb-[1rem]">
          <input
            type={show ? 'text' : 'password'}
            placeholder="password"
            {...formik.getFieldProps('password')}
            className="w-full p-[0.5rem] sm:w-[30rem] text-white rounded-lg playfulFont focus:border-cyan-600 outline-none bg-slate-900 border-4 text-xl border-zinc-500"
          />
          <div
            onClick={() => setShow(!show)}
            className="absolute top-[0.5rem] cursor-pointer text-2xl text-zinc-200 right-[1rem]"
          >
            {show ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-sharp fa-solid fa-eye"></i>
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
            className="w-[80%] sm:w-[15rem] duration-300 relative sm:after:absolute sm:after:top-0 after:right-full sm:after:bg-rose-600 after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 sm:hover:text-white bg-cyan-600 mt-[1rem] rounded-lg font-bold uppercase p-[0.5rem] text-xl"
          >
            <h1 className="relative z-20">Login</h1>
          </button>
        </div>
      </form>
      <div className="flex mt-[2rem] text-xl">
        <p className="text-white mr-[0.5rem]">Don&#39;t have an account</p>
        <Link href={'/register'} onClick={set} className="text-teal-700">
          Register
        </Link>
      </div>
    </section>
  );
}
