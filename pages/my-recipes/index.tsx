import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { useState } from "react";
import RecipeList from "../../components/recipes/RecipeList";
import { getRecipeCollection } from "../../lib/mongodb";
import { Recipe } from "../add-recipe";
import { options } from "../api/auth/[...nextauth]";

type MyRecipesProps = {
  recipes: Recipe[];
  lastValue: string;
};

function MyRecipes({ recipes, lastValue }: MyRecipesProps) {
  const [recipeList, setRecipeList] = useState<Recipe[]>(recipes);
  const [lastFetchedValue, setLastFetchedValue] = useState(lastValue);
  const [fetching, setFetching] = useState(false);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const handleFetch = async () => {
    if (!lastFetchedValue) {
      return;
    }
    setFetching(true);
    const res = await fetch(
      `/api/recipes?lastValue=${lastFetchedValue}&limit=20`,
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

  return (
    <section>
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
  let lastValue = recipes[19]._id.toString();
  return {
    props: {
      recipes: recipes.map((recipe) => ({
        id: recipe._id.toString(),
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        image: recipe.image,
        userId: recipe.userId,
      })),
      lastValue: lastValue,
    },
  };
}
