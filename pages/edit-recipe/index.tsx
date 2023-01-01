import { useRouter } from "next/router";
import RecipeForm from "../../components/recipes/RecipeForm";
import { Recipe } from "../add-recipe";

function EditRecipe() {
  const router = useRouter();
  const recipeFromQuery = router.query;
  const recipeToEdit = recipeFromQuery as unknown as Recipe;

  const handleEditReciepe = (recipe: Recipe) => {
    console.log("EDITED RECIPE:");
    console.log(recipe);
    router.push("./");
  };

  return (
    <section>
      <RecipeForm
        handleAddRecipe={handleEditReciepe}
        edit
        values={recipeToEdit}
      />
    </section>
  );
}

export default EditRecipe;
