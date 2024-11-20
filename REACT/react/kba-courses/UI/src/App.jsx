import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route,} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import AddCourse from './pages/AddCourse';
import CoursePage , { courseLoader } from './pages/CoursePage';
import EditCourse from './pages/EditCourse';
import NotFound from './pages/NotFound';
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <>
    {/* public routes */}
    <Route path="/" element={<LoginPage />}/>
    <Route path="/Signup" element={<SignupPage />}/>''
      {/* protected Routes */}
      <Route element={<AuthLayout/>}>
      <Route element={<MainLayout/>}>
      <Route path="/home" element={<Home/>}/>
      <Route path="/courses" element={<Courses/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/addcourse" element={<AddCourse/>}/>
      <Route path='/editcourse/:id' element={<EditCourse/>} loader={courseLoader}/>
      <Route path='/course/:id' element={<CoursePage/>} loader={courseLoader}/>
      </Route>
      </Route>
      {/* not found */}
      <Route path="*" element={<NotFound/>}/>
    </>
    )
  )
  return (
   <RouterProvider router={router}/>
  )
}

export default App