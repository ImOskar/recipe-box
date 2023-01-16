import { useRouter } from "next/router";
import RecipeDetail from "../../../components/recipes/RecipeDetail";
import { getRecipeCollection } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { Recipe } from "../../add-recipe";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import Spinner from "../../../components/ui/Spinner";

type DetailProps = {
  recipe: Recipe;
};

function RecipeDetailPage({ recipe }: DetailProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/recipes", {
        method: "DELETE",
        body: JSON.stringify(recipe.id),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
    } catch (error) {}
    setLoading(false);
    router.push("/");
  };

  const handleLike = async (id: string) => {
    if (typeof recipe.likes !== "undefined") {
      if (recipe.likes.includes(id)) {
        recipe.likes = recipe.likes.filter((like) => like !== id);
      } else recipe.likes = [...recipe.likes, id];
    } else recipe = { ...recipe, likes: [id] };
    try {
      const res = await fetch("/api/recipes", {
        method: "PUT",
        body: JSON.stringify(recipe),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
    } catch (error) {}
  };

  return (
    <section>
      {loading && <Spinner style="spinnerlrg" />}
      <RecipeDetail
        recipe={recipe}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />
    </section>
  );
}

export default RecipeDetailPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.recipeId as string;
  const recipeCollection = await getRecipeCollection();
  let result = await recipeCollection.findOne({ _id: new ObjectId(id) });
  let recipe = { ...result };
  recipe.id = result?._id.toString();
  delete recipe._id;
  return {
    props: {
      recipe: recipe,
    },
  };
}
