import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise, { getUserCollection } from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const options: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/log-in",
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session?.user) {
        let str = token.uid as string;
        session.user.id = str;
        // session.user.id = user.id;
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
    CredentialsProvider({
      credentials: { email: { type: "email" }, password: { type: "password" } },
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

        let id = user._id.toString();
        return {
          id: id,
          name: user.name,
          email: user.email,
        };
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
