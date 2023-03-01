import { useRouter } from "next/router";
import RecipeDetail from "../../../components/recipes/RecipeDetail";
import { Recipe } from "../../add-recipe";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import Spinner from "../../../components/ui/Spinner";
import Head from "next/head";
import { getRecipeServerSide } from "../../../lib/utils";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import CommentList from "../../../components/comments/CommentList";

type DetailProps = {
  recipe: Recipe;
};

function RecipeDetailPage({ recipe }: DetailProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/recipes", {
        method: "DELETE",
        body: JSON.stringify(recipe.id),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
    } catch (error) {}
    setShowModal(false);
    router.push("/my-recipes/all");
    setLoading(false);
  };

  const handleLike = async (id: string) => {
    if (typeof recipe.likes !== "undefined") {
      if (recipe.likes.includes(id)) {
        recipe.likes = recipe.likes.filter((like) => like !== id);
      } else recipe.likes = [...recipe.likes, id];
    } else recipe = { ...recipe, likes: [id] };
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
  };

  const handleCategory = (category: string) => {
    router.push(`/explore/${category}`);
  };

  return (
    <section>
      <Head>
        <title>{recipe.title}</title>
        <meta name="explore" content="Save all your recipes in one place!" />
      </Head>
      {loading && <Spinner style="spinnerlrg" />}
      <RecipeDetail
        recipe={recipe}
        handleModal={setShowModal}
        handleLike={handleLike}
        handleCategory={handleCategory}
      />
      <CommentList recipeId={recipe.id!} />
      {showModal && (
        <Modal
          hideModal={setShowModal}
          title="Are you sure you want to delete this recipe?"
        >
          <Button addStyle={"med"} onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button addStyle={["med", "alert"]} onClick={handleDelete}>
            Delete
          </Button>
        </Modal>
      )}
    </section>
  );
}

export default RecipeDetailPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.recipeId as string;
  const recipe = await getRecipeServerSide(id);

  return {
    props: {
      recipe: recipe,
    },
  };
}
