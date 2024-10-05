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
          
        </div>
      </div>
    
    </nav>
  )
}

export default Navbar