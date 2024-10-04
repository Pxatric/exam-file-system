import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../lib/db';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { username, password } = credentials;
      
        const user = await prisma.user.findUnique({
          where: { username: username },
        });
      
        if (user && await bcrypt.compare(password, user.password)) {
          return { id: user.id, name: user.username, role: user.role }; // ส่งคืนข้อมูลผู้ใช้รวมถึงบทบาท
        } else {
          throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // เปลี่ยนไปยังหน้าเข้าสู่ระบบของคุณ
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // เก็บบทบาทใน token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // ส่งบทบาทไปยัง session
      return session;
    }
  }
});
