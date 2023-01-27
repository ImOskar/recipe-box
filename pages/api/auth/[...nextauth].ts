import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise, { getUserCollection } from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const options: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/log-in",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        const password = credentials?.password!;
        const email = credentials?.email!;
        const userCollection = await getUserCollection();
        const user = await userCollection.findOne({ email: email });
        if (!user) {
          throw new Error("You haven't registered yet");
        }
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
          throw new Error("Password Incorrect.");
        }
        if (user) {
          let id = user._id.toString();
          const userObj = {
            id: id,
            name: user.username,
            email: user.email,
            image: null,
          };
          return userObj;
        } else return null;
      },
    }),
  ],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return NextAuth(req, res, options);
}
