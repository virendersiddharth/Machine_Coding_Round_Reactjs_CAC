import React from 'react'
import { Outlet } from 'react-router-dom'
import ChaiLogo from "../assets/chailogo.png"

const Home = () => {
  return (
    <div className='w-full min-h-screen relative border bg-gray-500'>
          <Outlet/>
        <div className='fixed z-50 bottom-16 right-16 w-40'>
            <a href="https://chaicode.com/" target='_blank'>
                <img src={ChaiLogo} alt="logo" className='w-full'/>
            </a>
        </div>
    </div>
  )
}

export default Home