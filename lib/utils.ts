import { ObjectId } from "mongodb";
import { Recipe } from "../pages/add-recipe";
import { getCollection } from "./mongodb";

export const getRecipeServerSide = async (id: string) => {
  const recipeCollection = await getCollection("recipes");
  const result = await recipeCollection.findOne({ _id: new ObjectId(id) });
  let recipe = { ...result, id: result?._id.toString() };
  delete recipe._id;
  return recipe as Recipe;
};

export const getRecipesServerSide = async (query: Object) => {
  const recipeCollection = await getCollection("recipes");
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
