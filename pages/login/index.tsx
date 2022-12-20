import LoginForm from '../../components/LoginPage';
import Head from 'next/head';
export default function Login() {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm />
    </div>
  );
}
