import Head from "next/head";
import LogInForm from "../../components/user/LogInForm";

function LogInPage() {
  return (
    <section>
      <Head>
        <title>Log in</title>
        <meta name="explore" content="Save all your recipes in one place!" />
      </Head>
      <LogInForm />
    </section>
  );
}

export default LogInPage;
