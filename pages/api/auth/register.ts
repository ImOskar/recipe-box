import { getUserCollection } from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userCollection = await getUserCollection();
    let { username, email, password } = req.body;

    const userExists = await userCollection.findOne({ email: email });
    if (userExists) {
      res.status(200).json({ message: "Email already registered" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = {
      username: username,
      email: email,
      password: hashPassword,
    };

    const result = await userCollection.insertOne(user);
    res.status(200).json({ message: "User registered", ...result });
  } else {
    res.status(500).json({ message: "Route not valid" });
  }
}
