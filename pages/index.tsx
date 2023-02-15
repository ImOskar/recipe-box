import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import backgroundImage from "../public/pexels-ella-olsson-1640774.jpg";
import { Fragment } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Button from "../components/ui/Button";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]";
import RecipeSearch from "../components/recipes/RecipeSearch";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Fragment>
      <Head>
        <title>Recipe Box</title>
        <meta
          name="description"
          content="Save all your recipes in one place!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.splashcontainer}>
        <Image
          className={styles.splashimage}
          src={backgroundImage}
          alt="Splash image"
          placeholder="blur"
          priority
          fill
        />
        <div className={styles.splashtextcontainer}>
          <p className={styles.splashlogo}>Recipe Box</p>
          <p className={styles.splashtext}>All your recipes in one place</p>
          <RecipeSearch />
          {!session ? (
            <Link href="/register">
              <Button addStyle={["orange", "lrg"]}>Sign up</Button>
            </Link>
          ) : (
            <div className={styles.search}>
              <Link href="/explore/all">
                <Button addStyle={["orange", "lrg"]}>Explore recipes</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    options
  );
  return { props: { session } };
}
