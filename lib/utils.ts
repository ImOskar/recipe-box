import { ObjectId } from "mongodb";
import { getRecipeCollection } from "./mongodb";

export const getRecipeServerSide = async (id: string) => {
  const recipeCollection = await getRecipeCollection();
  const result = await recipeCollection.findOne({ _id: new ObjectId(id) });
  let recipe = { id: result?._id.toString(), ...result };
  delete recipe._id;
  return recipe;
};

export const getRecipesServerSide = async (query: Object) => {
  const recipeCollection = await getRecipeCollection();
  const recipes = await recipeCollection
    .find(query)
    .sort({ _id: -1 })
    .limit(20)
    //.collation({ locale: "en", strength: 1 })
    .toArray();
  let lastValue;
  if (recipes.length === 20) lastValue = recipes[19]._id.toString();
  else lastValue = "";

  return {
    recipes: recipes.map((recipe) => ({
      id: recipe._id.toString(),
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      image: recipe.image,
      userId: recipe.userId,
    })),
    lastValue: lastValue,
  };
};