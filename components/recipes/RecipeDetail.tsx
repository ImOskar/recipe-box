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
};

function RecipeDetail({ recipe, handleDelete }: DetailProps) {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit-recipe/${recipe.id}`);
  };

  const image =
    typeof recipe.image !== "undefined" &&
    recipe.image !== "" &&
    "image" in recipe;

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
          //placeholder="blur"
        />
      </span>
      <div className={styles.recipedetails}>
        <div className={styles.cooktime}>
          <p>
            <span>Prep time:</span>30 mins
          </p>
          <p>
            <span>Cook time:</span>30 mins
          </p>
          <p>
            <span>Total time:</span>60 mins
          </p>
          <p>
            <span>Servings:</span>Serves 4
          </p>
        </div>
        <i className="material-icons">favorite_border</i>
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
