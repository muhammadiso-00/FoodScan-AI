import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Log environment variables for debugging
console.log('GOOGLE_CLIENT_ID available:', !!process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET available:', !!process.env.GOOGLE_CLIENT_SECRET);
console.log('NEXTAUTH_SECRET available:', !!process.env.NEXTAUTH_SECRET);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login/error", // Handle errors on the login page
  },
  debug: true, // Enable detailed logs during development
  callbacks: {
    async signIn({ account, user }) {
      console.log('Sign in attempt:', { provider: account?.provider, email: user?.email });
      return true; // Allow all sign-ins for testing
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl });
      // Always redirect to /analyze after successful authentication
      return `${baseUrl}/analyze`;
    },
    async session({ session, token }) {
      // Pass additional data to the session if needed
      return session;
    },
    async jwt({ token, account }) {
      // Add extra token information if needed
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  events: {
    async signIn(message) {
      console.log('Successful sign in event:', message);
    },
    // Remove the error event from here as it's not part of the valid events
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
