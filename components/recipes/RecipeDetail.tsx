import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Recipe } from "../../pages/add-recipe";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import styles from "./RecipeDetail.module.css";
import fallbackImage from "../../public/pexels-ella-olsson-1640774.jpg";
import Link from "next/link";

type DetailProps = {
  recipe: Recipe;
  handleDelete: () => Promise<void>;
  handleLike: (id: string) => void;
};

function RecipeDetail({ recipe, handleDelete, handleLike }: DetailProps) {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState(recipe.likes);
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit-recipe/${recipe.id}`);
  };

  const handleUserLike = () => {
    if (!session) {
      router.push(`/log-in`);
      return;
    }
    let id = session?.user?.id as string;
    handleLike(id);
    setLikes((likes) => {
      if (!likes) return [id];
      if (likes.includes(id)) {
        return likes.filter((like) => like !== id);
      }
      return [...likes, id];
    });
  };

  const image =
    typeof recipe.image !== "undefined" &&
    recipe.image !== "" &&
    "image" in recipe;

  const likeCount = (): string => {
    if (!likes) return "0 likes";
    else if (likes.length === 1) return `${likes.length} like`;
    else return `${likes.length} likes`;
  };

  const checkIfUndefined = (
    item: string | number | undefined
  ): string | number => {
    if (item) return item;
    else return "";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.recipeheader}>
        <h1>{recipe.title}</h1>
        <span></span>
        <h3>By: {recipe.author ? recipe.author : "UNKNOWN"}</h3>
      </div>
      <span className={styles.image}>
        <Image
          src={image ? recipe.image! : fallbackImage}
          alt="Recipe image"
          fill
          priority
          //placeholder="blur"
        />
      </span>
      <div className={styles.recipedetails}>
        <div className={styles.likescontainer}>
          <div className={styles.likes}>
            <Button addStyle={"like"} onClick={handleUserLike}>
              <i className="material-icons">
                {session && likes?.includes(session.user.id)
                  ? "favorite_filled"
                  : "favorite_border"}
              </i>
            </Button>
            <p>{likeCount()}</p>
          </div>
          <div className={styles.cooktime}>
            <p>
              <span>Prep time:</span>
              {checkIfUndefined(recipe.prepTime)}
            </p>
            <p>
              <span>Cook time:</span>
              {checkIfUndefined(recipe.cookTime)}
            </p>
            <p>
              <span>Total time:</span>
              {checkIfUndefined(recipe.totalTime)}
            </p>
            <p>
              <span>Servings:</span>
              {checkIfUndefined(recipe.recipeYield)}
            </p>
          </div>
        </div>
        <div className={styles.seperator}></div>
        <p className={styles.description}>{recipe.description}</p>
        <div className={styles.sectiontitle}>
          <p>Ingredients:</p>
          <div className={styles.seperator}></div>
        </div>
        <ul>
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
        <div className={styles.sectiontitle}>
          <p>Instructions:</p>
          <div className={styles.seperator}></div>
        </div>
        <ul className={styles.list}>
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
        <Link href="http://www.example.com">Original recipe</Link>
        {session !== null && session?.user.id === recipe.userId && (
          <span className={styles.buttons}>
            <Button addStyle={["med", "edit"]} onClick={handleEdit}>
              <i className="material-icons">edit_note</i>
              Edit recipe
            </Button>
            <Button
              addStyle={["med", "alert"]}
              onClick={() => setShowModal(true)}
            >
              <i className="material-icons">delete</i>
              Delete recipe
            </Button>
            {showModal && (
              <Modal deleteHandler={handleDelete} hideModal={setShowModal} />
            )}
          </span>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;
