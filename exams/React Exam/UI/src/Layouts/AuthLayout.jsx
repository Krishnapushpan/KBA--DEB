import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import getUserType from '../utils/auth.jsx'
const AuthLayout = () => {
    const userType = getUserType();
    if(!userType)
    {
        <Navigate to='/'/>
    }
  return <Outlet/>
}

export default AuthLayout