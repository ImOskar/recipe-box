import { getSession, GetSessionParams } from "next-auth/react";
import RecipeList from "../../components/recipes/RecipeList";
import { getRecipeCollection } from "../../lib/mongodb";
import { Recipe } from "../add-recipe";

type MyRecipesProps = {
  recipes: Recipe[];
};

function MyRecipes({ recipes }: MyRecipesProps) {
  return (
    <section>
      <RecipeList recipes={recipes} />
    </section>
  );
}

export default MyRecipes;

// export async function getStaticProps() {
//   const recipeCollection = await getRecipeCollection();
//   let recipes = await recipeCollection
//     .find({ userId: "63b7ebf0d20dcf446e6e707e" })
//     .toArray();
//   return {
//     props: {
//       recipes: recipes.map((recipe) => ({
//         id: recipe._id.toString(),
//         title: recipe.title,
//         description: recipe.description,
//         ingredients: recipe.ingredients,
//         steps: recipe.steps,
//         image: recipe.image,
//       })),
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  let userId = session?.user.id;
  console.log(userId);
  const recipeCollection = await getRecipeCollection();
  let recipes = await recipeCollection.find({ userId: userId }).toArray();
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
