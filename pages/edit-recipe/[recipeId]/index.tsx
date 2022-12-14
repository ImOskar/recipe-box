import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next/types";
import RecipeForm from "../../../components/recipes/RecipeForm";
import { getRecipeCollection } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { Recipe } from "../../add-recipe";
import { useEffect } from "react";

type EditProps = {
  recipe: Recipe;
};

function EditRecipe({ recipe }: EditProps) {
  const router = useRouter();

  const handleEditReciepe = async (recipe: Recipe) => {
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
    router.push(`/my-recipes`);
  };

  return (
    <section>
      <RecipeForm handleAddRecipe={handleEditReciepe} edit values={recipe} />
    </section>
  );
}

export default EditRecipe;

// export async function getStaticPaths() {
//   const recipeCollection = await getRecipeCollection();
//   const recipes = await recipeCollection
//     .find({}, { projection: { _id: 1 } })
//     .toArray();
//   return {
//     fallback: false,
//     paths: recipes.map((recipe) => ({
//       params: { recipeId: recipe._id.toString() },
//     })),
//   };
// }

// export async function getStaticProps({ params }: GetStaticPropsContext) {
//   const id = params?.recipeId as string;
//   const recipeCollection = await getRecipeCollection();
//   let recipe = await recipeCollection.findOne({ _id: new ObjectId(id) });
//   let res = { ...recipe };
//   res.id = recipe?._id.toString();
//   delete res._id;

//   return {
//     props: {
//       recipe: res,
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const id = context.params?.recipeId as string;
  const recipeCollection = await getRecipeCollection();
  let recipe = await recipeCollection.findOne({ _id: new ObjectId(id) });
  let res = { ...recipe };
  res.id = recipe?._id.toString();
  delete res._id;

  if (session === null || session.user.id !== recipe?.userId) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: {
      recipe: res,
    },
  };
}
