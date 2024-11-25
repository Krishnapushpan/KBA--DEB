import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className=' flex w-full h-[150px] bg-blue-900 '><nav>
        <Link className='text-white font-bold ' to='/Home'>Home</Link>
        <Link className='text-white font-bold ' to='/AddService'>Add Service</Link>
        <Link className='text-white font-bold ' to='/ViewService'>View Service</Link>
        </nav></div>
  )
}

export default Navbar