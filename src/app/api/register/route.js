import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";
import bcrypt from 'bcrypt';
import { Role } from '@prisma/client'; // นำเข้า Role enum

export async function POST(req) {
    try {
        const { firstname, lastname, role, tel, email, username, password } = await req.json();

        // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
        if (!firstname || !lastname || !role || !tel || !email || !username || !password) {
            throw new Error("Missing fields");
        }

        // ตรวจสอบให้แน่ใจว่าค่า role ถูกต้อง
        const validRoles = Object.values(Role); // ดึงค่าจาก Role enum
            if (!validRoles.includes(role)) {
            throw new Error(`Invalid role. Expected one of ${validRoles.join(', ')}`);
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

        // ส่งค่าของ role เป็น Enum
        const roleEnum = Role[role]; // ใช้ Enum ในการกำหนด role

        // บันทึกข้อมูลลงในฐานข้อมูล
        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                role: roleEnum, // ใช้ Enum ที่สร้างขึ้น
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
