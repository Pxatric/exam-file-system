"use client"

import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

function Navbar() {
  return (
    <nav className='shadow-xl'>
      <div className='container mx-auto'>
        <div className='flex justify-between item-center p-4'>
          <div>
              <Link href='/'>
                <span>EXAM FILE SYSTEM</span>
              </Link>
          </div>
          <ul className='flex'>
            <li className='mx-3'><a onClick={() => signOut()} className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2">Sign Out</a></li>
          </ul>
        </div>
      </div>
    
    </nav>
  )
}

export default Navbar