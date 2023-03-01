import { getCollection } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { Recipe } from "../add-recipe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipeCollection = await getCollection("recipes");
  let data = req.body;

  switch (req.method) {
    case "POST":
      try {
        let result = await recipeCollection.insertOne(data);
        res
          .status(201)
          .json({ message: "Recipe added successfully", ...result });
      } catch (error) {}
      break;
    case "PUT":
      try {
        let result = await recipeCollection.replaceOne(
          { _id: new ObjectId(data.id) },
          data
        );
        res.status(200).json({ message: "Recipe replaced", ...result });
      } catch (error) {}
      break;
    case "GET":
      let { lastValue, limit, key, value, user, id } = req.query;
      const filters = getFilters(
        lastValue as string,
        key as string,
        value as string,
        user as string,
        id as string
      );
      try {
        const result = await recipeCollection
          .find(filters)
          .sort({ _id: -1 })
          .limit(Number(limit))
          .toArray();
        let endValue;
        if (result.length < Number(limit)) {
          endValue = "";
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
        res.status(200).json({ recipes: recipes, endValue: endValue });
      } catch (error) {
        console.log(error);
      }
      break;
    case "DELETE":
      try {
        let result = await recipeCollection.deleteOne({
          _id: new ObjectId(data),
        });
        res.status(200).json({ message: "Recipe deleted", ...result });
      } catch (error) {}
      break;
    default:
      res.status(405).end();
  }
}

const getFilters = (
  lastValue: string,
  key: string,
  value: string,
  user: string,
  id: string
) => {
  let filter = [];
  if (lastValue) {
    filter.push({ _id: { $lt: new ObjectId(lastValue) } });
  }
  if (user) filter.push({ [user]: id });
  if (key) filter.push({ [key]: { $regex: new RegExp(value, "i") } });
  if (!filter.length) return {};
  else if (filter.length === 1) return filter[0];
  else return { $and: filter };
};
