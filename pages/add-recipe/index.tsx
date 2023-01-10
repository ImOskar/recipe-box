import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import RecipeForm from "../../components/recipes/RecipeForm";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";

export type Recipe = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  steps: string[];
  ingredients: string[];
  cookTime?: string;
  prepTime?: string;
  totalTime?: string;
  recipeYield?: number | string;
  recipeCategories?: string[];
  keywords?: string[];
  url?: string;
  userId?: string;
  author?: string;
};

function AddRecipePage() {
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) router.push("/log-in");
  // }, []);

  const handleAddRecipe = async (recipeData: Recipe) => {
    recipeData.userId = session?.user.id;
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify(recipeData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
    } catch (error) {}
    router.push("/my-recipes");
  };

  return (
    <section>
      <RecipeForm handleAddRecipe={handleAddRecipe} />
    </section>
  );
}

export default AddRecipePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
  return { props: {} };
}
