"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';

function WelcomePage() {
    const { data: session } = useSession();
    
    console.log(session);

    
    const firstname = session?.user?.firstname || 'Guest'; 
    return (
        <div>
            <Navbar />
            <div className='container mx-auto'>
                <h3>Welcome {firstname}</h3>
                <hr className='my-3'/>
                <p>ยินดีต้อนรับคุณผู้ใช้ทุกท่าน</p>
            </div>
        </div>
    );
}

export default WelcomePage;
