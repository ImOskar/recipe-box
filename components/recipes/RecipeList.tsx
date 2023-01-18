import RecipeCard from "./RecipeCard";
import { Recipe } from "../../pages/add-recipe";
import styles from "./RecipeList.module.css";
import Button from "../ui/Button";
import Link from "next/link";

type ListProps = {
  recipes: Recipe[];
  fetchRecipes: () => void;
  fetching: boolean;
  lastItem: boolean;
};

function RecipeList({ recipes, fetchRecipes, fetching, lastItem }: ListProps) {
  return (
    <>
      <section className={styles.recipelist}>
        {!recipes.length && (
          <div className={styles.empty}>
            <p>Looks like you should start adding recipes!</p>
            <Link href={"/add-recipe"}>Add recipe</Link>
          </div>
        )}
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.title} {...recipe} />
        ))}
        {!lastItem && (
          <div className={styles.button}>
            <Button
              addStyle={["orange", "lrg"]}
              onClick={fetchRecipes}
              loading={fetching}
            >
              Load more recipes
            </Button>
          </div>
        )}
      </section>
    </>
  );
}

export default RecipeList;
