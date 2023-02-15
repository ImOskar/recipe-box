import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { useEffect, useState } from "react";
import RecipeFilter from "../../../components/recipes/RecipeFilter";
import RecipeList from "../../../components/recipes/RecipeList";
import Header from "../../../components/ui/Header";
import { getRecipesServerSide } from "../../../lib/utils";
import { Recipe } from "../../add-recipe";
import { options } from "../../api/auth/[...nextauth]";

type TypeProps = {
  recipes: Recipe[];
  lastValue: string;
  category: string;
  userId: string;
};

function Type({ recipes, lastValue, category, userId }: TypeProps) {
  const [recipeList, setRecipeList] = useState<Recipe[]>(recipes);
  const [lastFetchedValue, setLastFetchedValue] = useState(lastValue);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setRecipeList(recipes);
    setLastFetchedValue(lastValue);
  }, [lastValue, recipes]);

  const handleFetch = async () => {
    setFetching(true);
    const res = await fetch(
      `/api/recipes?lastValue=${lastFetchedValue}&limit=20&${getFilter()}`,
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
    setFetching(false);
  };

  const getFilter = () => {
    if (category.toLowerCase() === "all")
      return `key=&value&user=userId&id=${userId}`;
    else if (category.toLowerCase() === "liked")
      return `key=likes&value=${userId}}`;
    else
      return `key=recipeCategories&value=${category}&user=userId&id=${userId}`;
  };

  return (
    <section>
      <Head>
        <title>My recipes: {category}</title>
        <meta name="explore" content="Save all your recipes in one place!" />
      </Head>
      <Header>My recipes</Header>
      <RecipeFilter selectedCategory={category} userFilter />
      <RecipeList
        recipes={recipeList}
        fetchRecipes={handleFetch}
        fetching={fetching}
        lastItem={!lastFetchedValue}
      />
    </section>
  );
}

export default Type;

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
  const category = context.params?.category as string;
  const userId = session?.user.id;
  let filter;
  if (category.toLowerCase() === "all") filter = { userId: userId };
  else if (category.toLowerCase() === "liked") {
    filter = { likes: userId };
  } else
    filter = {
      $and: [
        { userId: userId },
        { recipeCategories: { $regex: new RegExp(category, "i") } },
      ],
    };
  const { recipes, lastValue } = await getRecipesServerSide(filter);

  return {
    props: {
      recipes: recipes,
      lastValue: lastValue,
      category: category,
      userId: userId,
    },
  };
}
