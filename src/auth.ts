import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  providers: [
    Credentials({
      credentials: {
        phonenumber: { label: "Phone Number", type: "text" },
        OTPValue: { label: "OTP", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials.phonenumber || !credentials.OTPValue) {
          throw new Error("Phone number and OTP are required");
        }

        try {
          const response = await axios.post(
            "https://hotelbookingcenter.pythonanywhere.com/api/token/verify-otp/",
            {
              phone_number: credentials.phonenumber,
              otp: credentials.OTPValue,
            }
          );

          console.log(response.data);

          const user = {
            ...response.data,
            name: response.data?.phone_number,
            id: response.data?.user_id,
          }; // Adjust based on the shape of your API response

          console.log(user);

          // Check if the user object contains the required properties
          if (user && user.name) {
            console.log("user", user);
            return user; // Return user object if authentication is successful
          } else {
            throw new Error("Invalid OTP or phone number");
          }
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        ...token,
        id: token.sub as string,
      } as any;
      return session;
    },
  },
  session: { strategy: "jwt" },
});
