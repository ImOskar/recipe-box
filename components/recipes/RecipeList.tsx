import RecipeCard from "./RecipeCard";
import { Recipe } from "../../pages/add-recipe";
import styles from "./RecipeList.module.css";

type ListProps = {
  recipes: Recipe[];
};

function RecipeList({ recipes }: ListProps) {
  return (
    <section className={styles.recipelist}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.title} {...recipe} />
      ))}
    </section>
  );
}

export default RecipeList;
