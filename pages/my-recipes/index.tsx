import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import RecipeFilter from "../../components/recipes/RecipeSearch";
import RecipeList from "../../components/recipes/RecipeList";
import { getRecipeCollection } from "../../lib/mongodb";
import { Recipe } from "../add-recipe";
import { options } from "../api/auth/[...nextauth]";
import Head from "next/head";

type MyRecipesProps = {
  recipes: Recipe[];
  lastValue: string;
  user: string;
};

function MyRecipes({ recipes, lastValue, user }: MyRecipesProps) {
  const [recipeList, setRecipeList] = useState<Recipe[]>(recipes);
  const [lastFetchedValue, setLastFetchedValue] = useState(lastValue);
  const [fetching, setFetching] = useState(false);
  const [noMoreItems, setNoMoreItems] = useState(false);

  // const [query, setQuery] = useState("");
  // const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!lastFetchedValue) setNoMoreItems(true);
  }, []);

  const handleFetch = async () => {
    if (!lastFetchedValue) {
      return;
    }
    setFetching(true);
    const res = await fetch(
      `/api/recipes?lastValue=${lastFetchedValue}&limit=20&key=userId&value=${user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let { endValue, recipes } = await res.json();
    setRecipeList([...recipeList, ...recipes]);
    setLastFetchedValue(endValue);
    if (!endValue) setNoMoreItems(true);
    setFetching(false);
  };

  // const handleSearch = (query: string) => {
  //   setQuery(query);
  // };

  // const handleFilter = (filter: Filter) => {
  //   setFilter(filter);
  // };

  // const searchAndFilter = (items: Recipe[]) => {
  //       return items.filter((item) => {
  //         return item.recipeCategories?.includes(filter) || item.keywords?.includes(filter)});
  // };

  return (
    <section>
      <Head>
        <title>My recipes</title>
        <meta name="explore" content="Save all your recipes in one place!" />
      </Head>
      {/* <RecipeFilter handler={handleSearch} /> */}
      <RecipeList
        recipes={recipeList}
        fetchRecipes={handleFetch}
        fetching={fetching}
        lastItem={noMoreItems}
      />
    </section>
  );
}

export default MyRecipes;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    options
  );
  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/log-in",
      },
      props: {},
    };
  }
  let userId = session?.user.id;
  const recipeCollection = await getRecipeCollection();
  let recipes = await recipeCollection
    .find({ userId: userId })
    .sort({ _id: -1 })
    .limit(20)
    .toArray();
  let recipeList;
  let lastValue;
  if (recipes.length < 1) {
    lastValue = null;
    recipeList = recipes;
  } else {
    recipeList = recipes.map((recipe) => ({
      id: recipe._id.toString(),
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      image: recipe.image,
      userId: recipe.userId,
    }));
    if (recipes.length === 20) lastValue = recipes[19]._id.toString();
    else lastValue = null;
  }
  return {
    props: {
      recipes: recipeList,
      lastValue: lastValue,
      user: userId,
    },
  };
}
