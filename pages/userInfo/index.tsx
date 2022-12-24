import UserDashBoard from '../../components/UserDashboard';
import { useAuth } from '../../context/ContextProvider';
import Head from 'next/head';
import { useRouter } from 'next/router';
export default function UserInfo() {
  const { currentUser } = useAuth();
  const router = useRouter();
  if (!currentUser) router.push('/login');
  return (
    <div>
      <Head>
        <title>userInfo</title>
      </Head>
      <UserDashBoard />
    </div>
  );
}
