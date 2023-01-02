import Head from "next/head";
import Image from "next/image";
import backgroundImage from "../public/pexels-ella-olsson-1640774.jpg";
import { Fragment, useState } from "react";
import RecipeList from "../components/recipes/RecipeList";
import { Recipe } from "./add-recipe";
import styles from "../styles/Home.module.css";
import RecipeFilter from "../components/recipes/RecipeFilter";
import Link from "next/link";

import { RECIPE_LIST } from "../components/recipes/RECIPE_LIST";
import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";

type Filter = "" | "Breakfast" | "Lunch" | "Dinner";

export default function Home() {
  const recipes = RECIPE_LIST;

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };

  const displayFiltered = (items: Recipe[]) => {
    return items.filter((recipe) => {
      return recipe.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  };

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
          //https://recipe-images.s3.eu-west-1.amazonaws.com/pexels-ella-olsson-1640774.jpg//
          alt="Splash image"
          priority
          fill
        />
        <div className={styles.splashtextcontainer}>
          <div className={styles.splashlogo}>
            <Logo size="splash" />
          </div>
          <p className={styles.splashtext}>All your recipes in one place</p>
          <Link href="/register">
            <Button addStyle={["signup", "lrg"]}>Sign up</Button>
          </Link>
        </div>
      </section>
      <RecipeFilter handler={handleSearch} />
      <RecipeList recipes={displayFiltered(recipes)} />
    </Fragment>
  );
}
