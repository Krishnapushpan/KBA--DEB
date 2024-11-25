import React from 'react'
import ServiceCard from './ServiceCard'
import { useState,useEffect } from 'react';
const ServiceGrid = () => { 
  
      const  fetchservices=async()=>{
        try{
          const res= await fetch('/api/viewvehicles');
          const data=await res.json();
          setService(data);
        }
        catch(error){
          console.log(error);
        }
     
      };
      fetchservices();
  

  return (
    <div className='grid grid-cols-1 '>
    {serviceList.map((service)=>(
        <ServiceCard key={service.serviceno}service={service}/>
    ))}
</div>
  )
}

export default ServiceGrid