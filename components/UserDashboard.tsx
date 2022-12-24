import { useAuth } from '../context/ContextProvider';
import CartPage from './CartPage';

export default function UserDashBoard() {
  const { logout, currentUser } = useAuth();

  if (!currentUser) return <></>;
  return (
    <div className="text-black w-[100vw] p-[0rem] pt-6 sm:mt-[8rem] sm:mt-[2rem] sm:text-xl items-center sm:w-[60rem] sm:m-auto flex flex-col">
      <div className="flex pl-8 sm:ml-0 flex-col sm:flex-row sm:items-center justify-evenly font-bold w-full sm:mt-10">
        <div className="flex items-center">
          <i className="fa-solid fa-user mr-2"></i>
          <h1>{currentUser.displayName}</h1>
        </div>
        <div className="flex items-center">
          <i className="fa-solid fa-at mr-2"></i>
          <h1>{currentUser.email}</h1>
        </div>
        <div>
          <button onClick={logout} className="text-red-700">
            Logout
          </button>
        </div>
      </div>
      <div>
        <CartPage />
      </div>
    </div>
  );
}
