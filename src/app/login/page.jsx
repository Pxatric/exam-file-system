"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      alert(result.error);
    } else {
      alert('เข้าสู่ระบบสำเร็จ!');
      console.log(result); // ตรวจสอบผลลัพธ์ที่ได้

      // ตรวจสอบว่า user มีอยู่และบทบาทถูกต้องหรือไม่
      if (result.user) {
        console.log(result.user); // ดีบักแสดงค่า user

        // เปรียบเทียบบทบาท
        const role = result.user.role; // ตรวจสอบว่า role มาจาก user หรือไม่
        switch (role) {
          case 'Admin':
            router.push('/admin');
            break;
          case 'Teacher':
            router.push('/teacher');
            break;
          case 'ExamTech':
            router.push('/examtech');
            break;
          case 'Technology':
            router.push('/technology');
            break;
          default:
            alert('บทบาทไม่ถูกต้อง');
        }
      } else {
        alert('ไม่พบข้อมูลผู้ใช้');
      }
    }
  };

  return (
    <div className='min-h-screen bg-[#e8e8e8]'>
      <Container>
        <Navbar />
        <div className='flex grow'>
          <div className='flex justify-center items-center w-full'>
            <div className='w-[400px] shadow-[0px_4px_10px_-5px_#0B121B] p-10 mt-5 rounded-2xl bg-[#ffffff]'>
              <h3 className='text-3xl text-center'>Sign in</h3>
              <hr className='my-3' />
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  className='w-full bg-gray-200 border py-2 px-3 rounded-2xl text-lg my-5 shadow-[0px_4px_10px_-5px_#0B121B]' 
                  placeholder="Username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required
                />
                <input 
                  type="password" 
                  className='w-full bg-gray-200 border py-2 px-3 rounded-2xl text-lg my-5 shadow-[0px_4px_10px_-5px_#0B121B]' 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
                <button 
                  type="submit" 
                  className='w-full bg-gradient-to-r from-[#0B121B] to-[#546172] text-white py-2 rounded-2xl mt-4 hover:bg-blue-700 transition-colors'
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
