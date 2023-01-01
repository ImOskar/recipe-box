import { useRouter } from "next/router";
import RecipeDetail from "../../components/recipes/RecipeDetail";

import { RECIPE_LIST } from "../../components/recipes/RECIPE_LIST";
import { Recipe } from "../add-recipe";

function RecipeDetailPage() {
  const router = useRouter();
  const recipeId = router.query.recipeId;

  const recipe = RECIPE_LIST.find(
    (recipe) => recipe.id.toString() === recipeId
  ) as Recipe;

  return (
    <section>
      <RecipeDetail recipe={recipe} />
    </section>
  );
}

export default RecipeDetailPage;
