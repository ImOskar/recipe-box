import { useRouter } from "next/router";

function RecipeDetailPage() {
  const router = useRouter();
  const recipeId = router.query.recipeId;
  return <h1>{recipeId}</h1>;
}

export default RecipeDetailPage;
