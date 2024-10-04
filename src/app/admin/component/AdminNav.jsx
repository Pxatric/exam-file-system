import React from 'react';
import Link from 'next/link';

function AdminNav() {
  return (
    <nav className='shadow-xl bg-[#0B121B]'>
      <div className='container mx-auto'>
        <div className='flex items-center p-4'>
          <Link href="/">
            <span className='text-white'>EXAM FILE SYSTEM</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;
