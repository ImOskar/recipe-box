import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import RecipeForm from "../../components/recipes/RecipeForm";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { unstable_getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";
import Head from "next/head";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

export type Recipe = {
  id?: string;
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
  recipeCuisines?: string[];
  keywords?: string[];
  likes?: string[];
  url?: string;
  userId?: string;
  author?: string;
};

function AddRecipePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [savingRecipe, setSavingRecipe] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleAddRecipe = async (recipeData: Recipe) => {
    recipeData.userId = session?.user.id;
    setSavingRecipe(true);
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify(recipeData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
      setModalTitle(`${result.message}.`);
    } catch (error) {
      setModalTitle("Couldn't save recipe.");
    }
    setSavingRecipe(false);
    setShowModal(true);
  };

  const handleModalClick = (path: string) => {
    setShowModal(false);
    router.push(path);
  };

  return (
    <section>
      <Head>
        <title>Add recipe</title>
        <meta name="explore" content="Save all your recipes in one place!" />
      </Head>
      <RecipeForm handleAddRecipe={handleAddRecipe} save={savingRecipe} />
      {showModal && (
        <Modal hideModal={setShowModal} title={modalTitle}>
          <Button
            addStyle={["med", "orange"]}
            onClick={() => handleModalClick("/my-recipes/all")}
          >
            My recipes
          </Button>
          <Button
            addStyle="med"
            onClick={() => handleModalClick("/add-recipe")}
          >
            Add new recipe
          </Button>
        </Modal>
      )}
    </section>
  );
}

export default AddRecipePage;

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
  return { props: {} };
}
