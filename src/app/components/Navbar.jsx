import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

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