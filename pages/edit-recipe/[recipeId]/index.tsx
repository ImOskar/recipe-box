import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";
import RecipeForm from "../../../components/recipes/RecipeForm";
import { Recipe } from "../../add-recipe";
import { useState } from "react";
import { options } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { getRecipeServerSide } from "../../../lib/utils";

type EditProps = {
  recipe: Recipe;
};

function EditRecipe({ recipe }: EditProps) {
  const [updatingRecipe, setUpdatingRecipe] = useState(false);
  const router = useRouter();

  const handleEditReciepe = async (recipe: Recipe) => {
    setUpdatingRecipe(true);
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
    setUpdatingRecipe(false);
    router.push(`/my-recipes`);
  };

  return (
    <section>
      <Head>
        <title>Edit recipe</title>
        <meta name="explore" content="Save all your recipes in one place!" />
      </Head>
      <RecipeForm
        handleAddRecipe={handleEditReciepe}
        edit
        values={recipe}
        save={updatingRecipe}
      />
    </section>
  );
}

export default EditRecipe;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    options
  );
  const id = context.params?.recipeId as string;
  const recipe = await getRecipeServerSide(id);

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
      recipe: recipe,
    },
  };
}
