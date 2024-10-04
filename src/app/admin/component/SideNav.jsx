import React from 'react';
import Link from 'next/link';

function SideNav() {
  return (
    <nav className='w-1/4 h-screen bg-[#0B121B] shadow-lg p-0 rounded-none top-0 left-0 '>
      <ul className='m-0 p-0'>
        <li>
          <Link className='block my-3 p-3 rounded-lg text-white hover:bg-gray-700' href="/admin">Dashboard</Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default SideNav;
