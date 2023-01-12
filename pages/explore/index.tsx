import RecipeList from "../../components/recipes/RecipeList";
import { getRecipeCollection } from "../../lib/mongodb";
import { Recipe } from "../add-recipe";

type ExploreProps = {
  recipes: Recipe[];
};

function Explore({ recipes }: ExploreProps) {
  return (
    <section>
      <RecipeList recipes={recipes} />
    </section>
  );
}

export default Explore;

export async function getServerSideProps() {
  const recipeCollection = await getRecipeCollection();
  let recipes = await recipeCollection.find().toArray();
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
    },
  };
}
