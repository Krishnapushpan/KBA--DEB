import React from 'react';
import { Link } from 'react-router-dom';
import carimg from '../assets/images/carr1.jpg'
import getUserType from '../Utils/Auth';

const CarCard = ({ car }) => {
  const userType = getUserType();
  //for deleting car
  const deleteCar=async()=>{
    const confirmDelete= window.confirm('are you sure you want to delete the car?')
    if(!confirmDelete)return;
    const res= await fetch(`/api/deletecar/${car._id}`,{
      method:'DELETE',
      credentials:'include'
    })
    if(res.ok){
      alert('Car removed successfully');
      window.location.reload()
    }
    else {
      const errorData = await res.json();
      alert(errorData.message || 'Error removing course');
    }
  }
  return (
    <div className="flex flex-col justify-between bg-white max-w-[320px] w-full rounded-lg shadow-md overflow-hidden mx-auto mt-2 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <p className="bg-blue-50 text-[#003066] text-sm font-medium px-2 py-2">Car ID: {car.carid}</p>

      {/* Car Image */}
      <img
        className="h-56 p-6 w-full object-cover"
        src={carimg}
        alt={`Car ID: ${car.carid}`}
      />

      {/* Car Details */}
      <div className="p-4 text-[#003066] space-y-2 text-sm">
        <p>
          <strong>35 Days or More:</strong> {car.carrent || 'N/A'} - per day
        </p>
        <p>
          <strong>Car Name:</strong> {car.carname || 'N/A'}
        </p>
        <p>
          <strong>Car Number:</strong> {car.carnumber || 'N/A'}
        </p>
        <p>
          <strong>Transmission:</strong> {car.transmission || 'N/A'}
        </p>
        <p>
          <strong>Year:</strong> {car.year || 'N/A'}
        </p>
       { userType === 'admin' &&   <p>
          <strong>Car _id:</strong> {car._id || 'N/A'}
        </p>}
      </div>

      {/* Rent Button */}
    { userType === 'user' &&  <div className="p-4 border-t border-gray-200 flex justify-center">
        <Link
            to={`/Rent/${car.carnumber}`} 
        
          className="px-6 py-2 bg-[#003066] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-300"
        >
          Rent Now
        </Link>
      </div>}

      {/* Admin Options */}
      {userType === 'admin' && (
        <div className="flex justify-between p-4 border-t border-gray-200">
          <Link
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300" to={`/editcar/${car._id}`}
          >
            Edit Car
          </Link>
          <button
            className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300" onClick={deleteCar}
          >
            Remove Car
          </button>
        </div>
      )}
    </div>
  );
};

export default CarCard;
