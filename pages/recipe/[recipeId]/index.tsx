import { useRouter } from "next/router";
import RecipeDetail from "../../../components/recipes/RecipeDetail";
import { getRecipeCollection } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { Recipe } from "../../add-recipe";
import { GetStaticPropsContext } from "next";
import { useState } from "react";
import Spinner from "../../../components/ui/Spinner";

type DetailProps = {
  recipe: Recipe;
};

function RecipeDetailPage({ recipe }: DetailProps) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await fetch("/api/recipes", {
        method: "DELETE",
        body: JSON.stringify(recipe.id),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
    } catch (error) {}
    setDeleting(false);
    router.push("/");
  };

  return (
    <section>
      {deleting && <Spinner />}
      <RecipeDetail recipe={recipe} handleDelete={handleDelete} />
    </section>
  );
}

export default RecipeDetailPage;

export async function getStaticPaths() {
  const recipeCollection = await getRecipeCollection();
  const recipes = await recipeCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();
  return {
    fallback: false,
    paths: recipes.map((recipe) => ({
      params: { recipeId: recipe._id.toString() },
    })),
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params?.recipeId as string;
  const recipeCollection = await getRecipeCollection();
  let recipeFromDb = await recipeCollection.findOne({ _id: new ObjectId(id) })!;
  return {
    props: {
      recipe: {
        id: recipeFromDb?._id.toString()!,
        title: recipeFromDb?.title!,
        description: recipeFromDb?.description!,
        ingredients: recipeFromDb?.ingredients!,
        steps: recipeFromDb?.steps!,
        image: recipeFromDb?.image!,
      },
    },
    revalidate: 1,
  };
}
