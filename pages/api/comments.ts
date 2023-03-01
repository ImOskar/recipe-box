import { getCollection } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { CommentType } from "../../components/comments/CommentPost";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const commentCollection = await getCollection("comments");
  let data = req.body;

  switch (req.method) {
    case "POST":
      try {
        let result = await commentCollection.insertOne(data);
        res
          .status(201)
          .json({ message: "Comment added successfully", ...result });
      } catch (error) {}
      break;
    case "PUT":
      try {
        let result = await commentCollection.replaceOne(
          { _id: new ObjectId(data.id) },
          data
        );
        res.status(200).json({ message: "Comment replaced", ...result });
      } catch (error) {}
      break;
    case "GET":
      let { recipeId } = req.query;
      try {
        const result = await commentCollection
          .find({ recipeId: recipeId })
          .sort({ _id: -1 })
          .toArray();
        let comments: CommentType[] = result.map((comment) => {
          return {
            id: comment._id.toString(),
            recipeId: comment.recipeId,
            user: comment.user,
            userId: comment.userId,
            replies: comment.replies,
            comment: comment.comment,
            timestamp: comment.timestamp,
          };
        });
        res.status(200).json({ comments: comments });
      } catch (error) {
        console.log(error);
      }
      break;
    case "DELETE":
      try {
        let result = await commentCollection.deleteOne({
          _id: new ObjectId(data),
        });
        res.status(200).json({ message: "Comment deleted", ...result });
      } catch (error) {}
      break;
    default:
      res.status(405).end();
  }
}
