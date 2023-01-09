import { getRecipeCollection } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

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
    case "DELETE":
      try {
        let result = await recipeCollection.deleteOne({
          _id: new ObjectId(data),
        });
        res.status(201).json({ message: "Recipe deleted", ...result });
      } catch (error) {}
      break;
    case "LIKE":
      try {
        let result = await recipeCollection.updateOne(
          { _id: new ObjectId(data) },
          {
            //
          }
        );
        console.log("LIKED: " + result);
        res.status(201).json({ message: "Recipe liked", ...result });
      } catch (error) {}
      break;
    default:
      res.status(405).end();
  }
}
