import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const providers = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(providers);

export { handler as GET, handler as POST };
