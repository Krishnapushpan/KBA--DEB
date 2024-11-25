import React from 'react'

const ServiceCard = ({service}) => {
  return (
    <>
    <div><p>serviceno : {service.serviceno}</p></div>
    <div><p>servicetype : {service.servicetype}</p></div>
    <div><p>vehicleno : {service.vehicleno}</p></div>
    <div><p>vehicletype : {service.vehicletype}</p></div>
    <div><p>ownername : {service.ownername}</p></div>
    <div><p>servicedate : {service.servicedate}</p></div>
    <div><p>servicetime : {service.servicetime}</p></div>
    </>
  )
}

export default ServiceCard