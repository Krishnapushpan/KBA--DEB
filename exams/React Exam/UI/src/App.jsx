import React from 'react'
import { createRoutesFromElements,Route,RouterProvider,createBrowserRouter} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthLayout from './Layouts/AuthLayout'
import MainLayout from './Layouts/MainLayout'
import Home from './pages/Home'
import AddService from './pages/AddService'
import ViewService from './pages/ViewService'

const App = () => {
  const router =createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route element={<AuthLayout/>}>
      <Route element={<MainLayout/>}>
      <Route path="/Home" element={<Home/> }/>
      <Route path="/AddService" element={<AddService/> }/>
      <Route path="/ViewService" element={<ViewService/> }/>

     </Route>
     </Route>
      </>
    )
  )
  return (
   <RouterProvider router={router}/>
  )
}

export default App