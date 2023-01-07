import { getRecipeCollection } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { Recipe } from "../add-recipe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipeCollection = await getRecipeCollection();
  //let data: Recipe = req.body;
  let data = req.body;

  switch (req.method) {
    case "POST":
      try {
        let result = await recipeCollection.insertOne(data);
        console.log("ADDED: " + result);
        res.status(201).json({ message: "Recipe inserted" });
      } catch (error) {}
      break;
    case "PUT":
      try {
        let result = await recipeCollection.replaceOne(
          { _id: new ObjectId(data.id) },
          data
        );
        console.log("EDITED: " + result);
        res.status(201).json({ message: "Recipe replaced" });
      } catch (error) {}
      break;
    case "DELETE":
      try {
        let result = await recipeCollection.deleteOne({
          _id: new ObjectId(data),
        });
        res.status(201).json({ message: "Recipe deleted" });
      } catch (error) {}
      break;
    case "INSERTMANY":
      try {
        let result = await recipeCollection.insertMany(data);
        console.log("ADDED: " + result);
        res.status(201).json({ message: "Recipe inserted" });
      } catch (error) {}
      break;
    default:
      res.status(405).json({ message: "What happened?" });
  }
}
