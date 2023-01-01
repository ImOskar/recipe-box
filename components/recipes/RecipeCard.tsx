import Image from "next/image";
import Link from "next/link";
import { Recipe } from "../../pages/add-recipe";
import styles from "./RecipeCard.module.css";

function RecipeCard(recipe: Recipe) {
  return (
    <div className={styles.card}>
      <Link href={"/" + recipe.id}>
        <span className={styles.image}>
          <img src={recipe.image} alt="Recipe image" width={300} />
          {/* <Image src={recipe.image} alt="Recipe image" width={72} height={16} /> */}
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
