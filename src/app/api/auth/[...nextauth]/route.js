import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../lib/db";
import bcrypt from 'bcryptjs';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { username, password } = credentials;
            
                try {
                    const user = await prisma.user.findUnique({ where: { username } });
            
                    // ถ้าหาไม่พบผู้ใช้
                    if (!user) {
                        throw new Error("User not found");
                    }
            
                    // ตรวจสอบรหัสผ่าน
                    const isValidPassword = await bcrypt.compare(password, user.password);
                    if (!isValidPassword) {
                        throw new Error("Invalid password");
                    }
            
                    // ส่งกลับข้อมูลผู้ใช้ที่ต้องการรวมถึง firstname และ role
                    return { id: user.id, username: user.username, firstname: user.firstname, role: user.role };
                } catch (error) {
                    console.log("Error: ", error);
                    throw new Error("Authorization failed");
                }
            }
            
        })
    ],
    session: {
        strategy: "jwt",
        // เพิ่ม callback เพื่อเก็บข้อมูล firstname ใน JWT
        jwt: {
            // ในกรณีที่คุณต้องการปรับแต่งข้อมูลที่ส่งกลับใน token
            encode: async ({ token, secret }) => {
                // Return the token with the additional information
                return jwt.sign(token, secret);
            },
            decode: async ({ token, secret }) => {
                // Decode the token
                return jwt.verify(token, secret);
            },
        },
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // เพิ่ม firstname ใน token
                token.firstname = user.firstname;
            }
            return token;
        },
        async session({ session, token }) {
            // ส่ง firstname จาก token ไปยัง session
            session.user.firstname = token.firstname;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
