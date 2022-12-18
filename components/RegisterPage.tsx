import { useFormik } from 'formik';
import { useState } from 'react';
import Link from 'next/link';
import { registrationValidation } from '../lib/validate';
import { useAuth } from '../context/ContextProvider';

interface Values {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function RegisterPage() {
  const { signup } = useAuth();
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
    <section className="w-[100vw] sm:w-full  min-h-screen flex flex-col items-center justify-center p-[0.5rem]">
      <h1 className="text-white mb-[3rem] sm:mb-[4rem] sm:text-5xl sm:font-extrabold font-bold text-3xl playfulFont">
        Registration Page
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            {...formik.getFieldProps('username')}
            className="w-full mb-[1rem] p-[0.5rem] sm:w-[30rem] text-white rounded-lg playfulFont bg-slate-900 border-4 focus:border-cyan-600 outline-none  text-xl border-zinc-500"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="something@gmail.com"
            {...formik.getFieldProps('email')}
            className="w-full mb-[1rem] p-[0.5rem] sm:w-[30rem] text-white rounded-lg playfulFont bg-slate-900 border-4 focus:border-cyan-600 outline-none text-xl border-zinc-500 "
          />
        </div>
        <div className="relative">
          <input
            type={show.password ? 'text' : 'password'}
            placeholder="password"
            required
            {...formik.getFieldProps('password')}
            className="w-full mb-[1rem] p-[0.5rem] sm:w-[30rem] text-white rounded-lg playfulFont bg-slate-900 border-4 text-xl border-zinc-500 focus:border-cyan-600 outline-none "
          />
          <div
            onClick={() => setShow({ ...show, password: !show.password })}
            className="absolute top-[50%] cursor-pointer translate-y-[-70%] text-2xl text-zinc-200 right-[1rem]"
          >
            {show.password ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-sharp fa-solid fa-eye"></i>
            )}
          </div>
        </div>
        <div className="relative">
          <input
            type={show.confirmPassword ? 'text' : 'password'}
            placeholder=" confim password"
            required
            {...formik.getFieldProps('confirmPassword')}
            className="w-full mb-[1rem] p-[0.5rem] sm:w-[30rem] text-white rounded-lg playfulFont bg-slate-900 border-4 text-xl border-zinc-500 focus:border-cyan-600 outline-none "
          />
          <div
            onClick={() =>
              setShow({ ...show, confirmPassword: !show.confirmPassword })
            }
            className="absolute top-[50%] cursor-pointer translate-y-[-70%] text-2xl text-zinc-200 right-[1rem]"
          >
            {show.confirmPassword ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-sharp fa-solid fa-eye"></i>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="w-[80%] sm:w-[15rem] duration-300 relative sm:after:absolute after:top-0 after:right-full sm:after:bg-rose-600 after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-white bg-cyan-600 mt-[1rem] rounded-lg font-bold uppercase p-[0.5rem] text-xl"
          >
            <h1 className="relative z-20">Register</h1>
          </button>
        </div>
      </form>
      <div className="flex mt-[2rem] text-xl">
        <p className="text-white mr-[0.5rem]">Already have an account</p>
        <Link href={'/login'} className="text-teal-700">
          Login
        </Link>
      </div>
    </section>
  );
}
