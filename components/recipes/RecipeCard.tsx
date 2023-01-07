import Image from "next/image";
import Link from "next/link";
import { Recipe } from "../../pages/add-recipe";
import styles from "./RecipeCard.module.css";
import fallback from "../../public/pexels-ella-olsson-1640774.jpg";

function RecipeCard(recipe: Recipe) {
  return (
    <div className={styles.card}>
      <Link href={"/recipe/" + recipe.id}>
        <span>
          <Image
            src={
              recipe.image !== "" && typeof recipe.image !== "undefined"
                ? recipe.image
                : fallback
            }
            alt="Recipe image"
            width={300}
            height={170}
            className={styles.image}
          />
        </span>
        <div className={styles.text}>
          <h4>{recipe.title}</h4>
          <p className={styles.description}>{recipe.description}</p>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
