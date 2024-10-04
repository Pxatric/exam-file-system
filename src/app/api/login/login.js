import prisma from '../../../../lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();

  // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
  if (!username || !password) {
    return NextResponse.json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' }, { status: 400 });
  }

  // ค้นหาผู้ใช้ในฐานข้อมูล
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });
  }

  // ส่งคืนข้อมูลผู้ใช้รวมถึงบทบาท
  return NextResponse.json({ id: user.id, name: user.username, role: user.role }, { status: 200 });
}
