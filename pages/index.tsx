import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import backgroundImage from "../public/pexels-ella-olsson-1640774.jpg";
import { Fragment } from "react";
import RecipeList from "../components/recipes/RecipeList";
import styles from "../styles/Home.module.css";
import RecipeFilter from "../components/recipes/RecipeFilter";
import Link from "next/link";
import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";

export default function Home() {
  const { data: session } = useSession();
  // const [query, setQuery] = useState("");
  // const [filter, setFilter] = useState("");

  // const handleSearch = (query: string) => {
  //   setQuery(query);
  // };

  // const handleFilter = (filter: Filter) => {
  //   setFilter(filter);
  // };

  // const displayFiltered = (items: Recipe[]) => {
  //   return items.filter((recipe) => {
  //     return recipe.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  //   });
  // };
  //console.log(session);

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
          <div className={styles.splashlogo}>
            <Logo size="splash" />
          </div>
          <p className={styles.splashtext}>All your recipes in one place</p>
          {!session ? (
            <Link href="/register">
              <Button addStyle={["signup", "lrg"]}>Sign up</Button>
            </Link>
          ) : (
            <Link href="/explore">
              <Button addStyle={["signup", "lrg"]}>Explore recipes</Button>
            </Link>
          )}
        </div>
      </section>
      {/* <RecipeFilter handler={handleSearch} />
      <RecipeList recipes={displayFiltered(recipes)} /> */}
    </Fragment>
  );
}

// export async function getStaticProps(context: GetSessionParams | undefined) {
//   return {
//     props: {
//       session: await getSession(context),
//     },
//   };
// }

// props: {
//   session: await unstable_getServerSession(
//     context.req,
//     context.res,
//     authOptions
//   }
