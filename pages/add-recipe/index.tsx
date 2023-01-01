import { useRouter } from "next/router";
import RecipeForm from "../../components/recipes/RecipeForm";

export type Recipe = {
  id: number;
  title: string;
  description?: string;
  image?: string;
  steps: string[];
  ingredients: string[];
  // category?: string;
  // video?: string;
  // time?: string;
  // author?: string;
  // userId: string:
};

function AddRecipePage() {
  const router = useRouter();

  const handleAddRecipe = (recipeData: Recipe) => {
    console.log(recipeData);
    router.push("./");
  };

  return (
    <section>
      <RecipeForm handleAddRecipe={handleAddRecipe} />
    </section>
  );
}

export default AddRecipePage;
