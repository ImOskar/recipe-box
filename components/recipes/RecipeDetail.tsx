import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Recipe } from "../../pages/add-recipe";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import styles from "./RecipeDetail.module.css";

type DetailProps = {
  recipe: Recipe;
};

function RecipeDetail({ recipe }: DetailProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    console.log("Deleted recipe: " + recipe.id);
    setShowModal(false);
  };

  const handleEdit = () => {
    router.push(
      {
        pathname: "/edit-recipe",
        query: recipe,
      },
      "/edit-recipe"
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.recipeheader}>
        <h1>{recipe.title}</h1>
        <h3>By: Yotem Ottolenghi</h3>
      </div>
      <span className={styles.image}>
        {/* <Image src={recipe.image} alt="Recipe image" width={350}  /> */}
        <img src={recipe.image} alt="Recipe image" width={350} />
      </span>
      <div className={styles.recipedetails}>
        <i className="material-icons">favorite_border</i>
        <p className={styles.description}>{recipe.description}</p>
        <h4>Ingredients:</h4>
        <ul>
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
        <h4>Instructions:</h4>
        <ul className={styles.list}>
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
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
      </div>
    </div>
  );
}

export default RecipeDetail;
