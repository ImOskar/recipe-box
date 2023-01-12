import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import RecipeList from "../../components/recipes/RecipeList";
import { getRecipeCollection } from "../../lib/mongodb";
import { Recipe } from "../add-recipe";
import { options } from "../api/auth/[...nextauth]";

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    options
  );
  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/log-in",
      },
      props: {},
    };
  }
  let userId = session?.user.id;
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
