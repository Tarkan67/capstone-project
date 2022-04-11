import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../utils/mongodb";
import { connectDb } from "../../../utils/db";
import User from "../../../schema/User";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, user, token }) {
      connectDb();
      const currentUser = await User.findById(user.id);
      if (currentUser.points == null) {
        currentUser.points = 0;
        currentUser.save();
      }
      return { ...session, user: { ...session.user, id: user.id } };
    },
  },
});
