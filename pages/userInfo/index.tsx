import UserDashBoard from '../../components/UserDashboard';
import Head from 'next/head';
export default function UserInfo() {
  return (
    <div>
      <Head>
        <title>userInfo</title>
      </Head>
      <UserDashBoard />
    </div>
  );
}
