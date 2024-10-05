import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        const { firstname, lastname, role, tel, email, username, password } = await req.json();

        // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
        if (!firstname || !lastname || !role || !tel || !email || !username || !password) {
            throw new Error("Missing fields");
        }

        // ตรวจสอบว่ามี email หรือ username ซ้ำหรือไม่
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingUser) {
            throw new Error("User with the same email or username already exists.");
        }

        // แฮชพาสเวิร์ดก่อนบันทึก
        const hashedPassword = await bcrypt.hash(password, 10);

        // บันทึกข้อมูลลงในฐานข้อมูล
        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                role, // ใช้ role เป็น String โดยตรง
                tel,
                email,
                username,
                password: hashedPassword
            }
        });

        // ส่งกลับผลลัพธ์
        return NextResponse.json({ message: "User registered successfully.", user: newUser }, { status: 201 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: error.message || "An error occurred." }, { status: 500 });
    }
}
