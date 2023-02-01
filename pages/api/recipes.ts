import { getRecipeCollection } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { Recipe } from "../add-recipe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipeCollection = await getRecipeCollection();
  let data = req.body;

  switch (req.method) {
    case "POST":
      try {
        let result = await recipeCollection.insertOne(data);
        res.status(201).json({ message: "Recipe inserted", ...result });
      } catch (error) {}
      break;
    case "PUT":
      try {
        let result = await recipeCollection.replaceOne(
          { _id: new ObjectId(data.id) },
          data
        );
        res.status(201).json({ message: "Recipe replaced", ...result });
      } catch (error) {}
      break;
    case "GET":
      let { lastValue, limit, key, value } = req.query;
      let filter;
      if (key) {
        filter = {
          $and: [
            { _id: { $lt: new ObjectId(lastValue?.toString()) } },
            { [key as string]: value },
          ],
        };
      } else filter = { _id: { $lt: new ObjectId(lastValue?.toString()) } };
      try {
        let result = await recipeCollection
          .find(filter)
          .sort({ _id: -1 })
          .limit(Number(limit))
          .toArray();
        let endValue;
        if (result.length < Number(limit)) {
          endValue = null;
        } else endValue = result.slice(-1)[0]._id;
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
        console.log("result: " + JSON.stringify(result));
        res.status(201).json({ recipes: recipes, endValue: endValue });
      } catch (error) {
        console.log(error);
      }
      break;
    case "DELETE":
      try {
        let result = await recipeCollection.deleteOne({
          _id: new ObjectId(data),
        });
        res.status(201).json({ message: "Recipe deleted", ...result });
      } catch (error) {}
      break;
    default:
      res.status(405).end();
  }
}
