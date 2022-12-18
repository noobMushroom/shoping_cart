import { useAuth } from '../context/ContextProvider';
export default function UserDashBoard() {
  const { logout } = useAuth();
  return (
    <div className="text-white">
      <button onClick={logout}> Logout</button>
    </div>
  );
}
