import { useAuth } from '../context/ContextProvider';
export default function UserDashBoard() {
  const { logout, currentUser } = useAuth();
  return (
    <div className="text-white w-[100vw] p-[1rem] sm:mt-[2rem] sm:w-[60rem] sm:m-auto flex flex-col">
      <div className="flex items-center">
        <h1 className="text-2xl mr-[0.5rem] text-orange-600 sm:mr-[1rem] text-white sm:mb-[1rem] sm:text-4xl sm:font-bold">
          username:
        </h1>
        <h1 className="text-2xl text-white sm:mb-[1rem] sm:text-4xl sm:font-bold">
          {currentUser.displayName}
        </h1>
      </div>
      <div className="flex items-center">
        <h1 className="text-xl mr-[0.5rem] text-orange-600 sm:mr-[1rem] text-white sm:text-xl sm:font-bold">
          email:
        </h1>
        <h1 className="text-xl text-white">{currentUser.email}</h1>
      </div>
      <button
        onClick={logout}
        className="w-[8rem] self-center mt-[1rem] bg-sky-500 p-[0.5rem] text-xl sm:hover:scale-110 duration-300 sm:hover:bg-red-600 sm:hover:opacity-50 rounded-md"
      >
        Logout
      </button>
      <div>
        <h1>carts</h1>
      </div>
    </div>
  );
}
