import React from 'react'
import Hero from '../components/Hero'
import TopCourses from '../components/TopCourses'
import CourseGrid from '../components/CourseGrid'
import ViewallCourses from '../components/ViewallCourses'
import MainLayout from '../layouts/MainLayout'

const Home = () => {

  return (
<>
    
         <Hero/>
         <TopCourses/>
         <CourseGrid isHome={false}/>
         <ViewallCourses/>
</>

  )
}

export default Home