import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import RecipeFilter from "../../../components/recipes/RecipeFilter";
import RecipeList from "../../../components/recipes/RecipeList";
import Header from "../../../components/ui/Header";
import { getRecipesServerSide } from "../../../lib/utils";
import { Recipe } from "../../add-recipe";

type CategoryProps = {
  recipes: Recipe[];
  lastValue: string;
  category: string;
};

function Category({ recipes, lastValue, category }: CategoryProps) {
  const [recipeList, setRecipeList] = useState<Recipe[]>(recipes);
  const [lastFetchedValue, setLastFetchedValue] = useState(lastValue);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setRecipeList(recipes);
    setLastFetchedValue(lastValue);
  }, [recipes, lastValue]);

  const handleFetch = async () => {
    const filter = getFilter();
    setFetching(true);
    const res = await fetch(filter, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let { endValue, recipes } = await res.json();
    setRecipeList([...recipeList, ...recipes]);
    setLastFetchedValue(endValue);
    setFetching(false);
  };

  const getFilter = () => {
    if (category.toLowerCase() === "all") {
      return `/api/recipes?lastValue=${lastFetchedValue}&limit=20`;
    } else
      return `/api/recipes?lastValue=${lastFetchedValue}&limit=20&key=recipeCategories&value=${category}`;
  };

  return (
    <section>
      <Head>
        <title>Explore: {category}</title>
        <meta name="explore" content="Save all your recipes in one place!" />
      </Head>
      <Header>Explore recipes</Header>
      <RecipeFilter selectedCategory={category} />
      <RecipeList
        recipes={recipeList}
        fetchRecipes={handleFetch}
        fetching={fetching}
        lastItem={!lastFetchedValue}
      />
    </section>
  );
}

export default Category;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const category = context.params?.category as string;
  let filter;
  if (category.toLowerCase() === "all") filter = {};
  else filter = { recipeCategories: { $regex: new RegExp(category, "i") } };
  const result = await getRecipesServerSide(filter);

  return {
    props: {
      recipes: result.recipes,
      lastValue: result.lastValue,
      category: category,
    },
  };
}
