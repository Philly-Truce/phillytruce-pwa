import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "../../../../data/users.json";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "example@gmail.com"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password"
        }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user = users.find(
          (user) => user.email === credentials?.email && user.password === credentials?.password
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  
};