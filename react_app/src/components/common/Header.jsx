import React from 'react'

const Header = ({ title }) => {
  return (
    <header className='bg-gray-800 backdrop-blur-md  shadow-lg  border-b border-gray-800'>
        <div className='max-w-7x1 mx-auto py-4 px-4 sm:px-6 lg:px-8'>
            <h1 className='text=2x1 font-semibold text-white'>{title}</h1>
        </div>
    </header>
  )
}

export default Header
