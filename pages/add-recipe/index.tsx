import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import RecipeForm from "../../components/recipes/RecipeForm";

export type Recipe = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  steps: string[];
  ingredients: string[];
  cookTime?: string;
  prepTime?: string;
  totalTime?: string;
  recipeYield?: number | string;
  recipeCategories?: string[];
  keywords?: string[];
  url?: string;
  userId?: string;
  author?: string;
};

function AddRecipePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddRecipe = async (recipeData: Recipe) => {
    console.log("SESSIONADD_RECIPE: " + session);
    recipeData.userId = session?.user.id;
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify(recipeData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
    } catch (error) {}
    router.push("/");
  };

  return (
    <section>
      <RecipeForm handleAddRecipe={handleAddRecipe} />
    </section>
  );
}

export default AddRecipePage;
