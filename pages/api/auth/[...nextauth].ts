import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENTID!,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      return true; // !!user.email?.endsWith("@can-play.org");
    },
  }
});
