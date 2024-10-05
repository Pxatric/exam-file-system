"use client";

import React,{ useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  
  const router = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const res = await signIn("credentials",{
          username,password,redirect:false
        })

        if (res.error) {
          setErrorMessage("Invalid credentials");
          return;
        }

        router.replace("Welcome");

    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen bg-[#e8e8e8]'>
      <Container>
        <Navbar />
        <div className='flex grow'>
          <div className='flex justify-center items-center w-full'>
            <div className='w-[400px] shadow-[0px_4px_10px_-5px_#0B121B] p-10 mt-5 rounded-2xl bg-[#ffffff]'>
              <h3 className='text-3xl text-center'>เข้าสู่ระบบ</h3>
              <hr className='my-3' />
              <form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className='bg-red-500 w-fit text-sm text-white py-1 rounded-md mt-2'>
                      {errorMessage}
                  </div>
                )}

                <input 
                  type="text" 
                  className='w-full bg-gray-200 border py-2 px-3 rounded-2xl text-lg my-5 shadow-[0px_4px_10px_-5px_#0B121B]' 
                  placeholder="ชื่อผู้ใช้" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required
                />
                <input 
                  type="password" 
                  className='w-full bg-gray-200 border py-2 px-3 rounded-2xl text-lg my-5 shadow-[0px_4px_10px_-5px_#0B121B]' 
                  placeholder="รหัสผ่าน" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
                <button 
                  type="submit" 
                  className='w-full bg-gradient-to-r from-[#0B121B] to-[#546172] text-white py-2 rounded-2xl mt-4 hover:bg-blue-700 transition-colors'
                >
                  เข้าสู่ระบบ
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
