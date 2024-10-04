import React from 'react'

function Container({ children }) {
  return (
    <div className='flex flex-col min-h-screen bg-[#e8e8e8] '>
      {children}
    </div>
  )
}

export default Container