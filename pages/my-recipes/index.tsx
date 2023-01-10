import { getSession, GetSessionParams } from "next-auth/react";
import { useSession } from "next-auth/react";
import router from "next/router";
import { useEffect } from "react";
import RecipeList from "../../components/recipes/RecipeList";
import { getRecipeCollection } from "../../lib/mongodb";
import { Recipe } from "../add-recipe";

type MyRecipesProps = {
  recipes: Recipe[];
};

function MyRecipes({ recipes }: MyRecipesProps) {
  // const { data: session } = useSession();

  // useEffect(() => {
  //   if (!session) router.push("/log-in");
  // }, []);

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
