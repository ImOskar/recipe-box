import RecipeList from "../../components/recipes/RecipeList";

import { RECIPE_LIST } from "../../components/recipes/RECIPE_LIST";

function Explore() {
  return (
    <section>
      <RecipeList recipes={RECIPE_LIST} />
    </section>
  );
}

export default Explore;
