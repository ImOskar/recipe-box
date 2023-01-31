import Head from "next/head";
import SignUpForm from "../../components/user/SignUpForm";

export type User = {
  id?: string;
  username: string;
  email: string;
  password: string;
};

function RegisterPage() {
  return (
    <section>
      <Head>
        <title>Sign up</title>
        <meta name="explore" content="Save all your recipes in one place!" />
      </Head>
      <SignUpForm />
    </section>
  );
}

export default RegisterPage;
