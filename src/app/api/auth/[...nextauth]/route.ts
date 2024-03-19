import NextAuth from "next-auth/next";
import GoogeProvider from "next-auth/providers/google";

const providers = {
  providers: [
    GoogeProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

const handler = NextAuth(providers);

export { handler as GET, handler as POST };
