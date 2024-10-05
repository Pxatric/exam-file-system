import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../lib/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { username, password } = credentials;

                try {
                    const user = await prisma.user.findUnique({ where: { username } });

                    
                    if (!user) {
                        throw new Error("User not found");
                    }

                    
                    const isValidPassword = await bcrypt.compare(password, user.password);
                    if (!isValidPassword) {
                        throw new Error("Invalid password");
                    }

                    
                    return { id: user.id, username: user.username, firstname: user.firstname, role: user.role, email: user.email };
                } catch (error) {
                    console.log("Error: ", error);
                    throw new Error("Authorization failed");
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role,
                    email: user.email,
                    firstname: user.firstname,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                    email: token.email, 
                    firstname: token.firstname,
                }
            };
        },
    },
    
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
