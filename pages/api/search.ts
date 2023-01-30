import { getRecipeCollection } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { Recipe } from "../add-recipe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipeCollection = await getRecipeCollection();
  let query = req.body;

  const pipeline = [
    {
      $search: {
        index: "searchRecipes",
        text: {
          query: query,
          path: {
            wildcard: "*",
          },
          fuzzy: {},
        },
      },
    },
  ];

  try {
    let result = await recipeCollection.aggregate(pipeline).toArray();
    let recipes: Recipe[] = result.map((recipe) => {
      return {
        id: recipe._id.toString(),
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        image: recipe.image,
        userId: recipe.userId,
      };
    });
    res.status(200).json(recipes);
  } catch (error) {}
}
