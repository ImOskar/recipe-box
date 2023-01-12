import { NextApiRequest, NextApiResponse } from "next";
import getRecipeData from "scrape-recipe-schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url!;
  if (typeof url === "string") {
    try {
      const data = await getRecipeData(url);
      if (typeof data.data !== "undefined") {
        data.data.image = "";
        res.status(200).json(data);
      } else {
        console.log(data);
        res.status(400).json("error");
      }
    } catch (error) {
      res.status(400).json("error");
      console.log(error);
    }
  }
}
