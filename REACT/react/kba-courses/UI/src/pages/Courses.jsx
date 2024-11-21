import React from 'react'
import MainLayout from '../layouts/MainLayout'
import CourseGrid from '../components/CourseGrid'


const Courses = () => {
  return (
    <>
        <h1 className='text-center-2xl font-bold mt-10'>All Courses</h1>
        <CourseGrid isHome={false}/>
</>
  )
}

export default Courses