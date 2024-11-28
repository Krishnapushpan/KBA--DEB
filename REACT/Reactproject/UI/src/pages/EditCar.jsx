import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({
    carid:'',
    carname: '',
    carrent: '',
    transmission: '',
    year:'',
    carnumber: '',
    image: null, // New field for image
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`/api/getcar/${id}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCar((prevCar) => ({
          ...prevCar,
          carid: data.car.carid|| '',
          carname: data.car.carname || '',
          carrent: data.car.carrent || '',
          transmission: data.car.transmission || '',
          year: data.car.year || '',
          carnumber: data.car.carnumber || '',
        }));
      } catch (error) {
        console.error('Error fetching car details:', error.message);
        alert('Failed to fetch car details. Please try again.');
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('carname', car.carname);
    formData.append('carrent', car.carrent);
    formData.append('transmission', car.transmission);
    formData.append('year', car.year);
    formData.append('carnumber', car.carnumber);
    if (car.image) {
      formData.append('image', car.image);
    }

    // try {
      const response = await fetch(`/api/updatecar/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });

      if (response.ok) {
        alert('Car updated successfully!');
        navigate('/cars');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to update car');
      }
    // } catch (error) {
    //   console.error('Error updating car:', error.message);
    //   alert('An error occurred while updating the car.');
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  

  return (
    <div className="w-full mx-auto bg-[#b2d0ec] p-6 ">
      <div className="px-[10px] py-[10px]">
  <form onSubmit={handleSubmit}>
    <div className="mx-auto bg-white w-[800px] p-8 rounded-lg">
      <p className="font-bold text-[#003066] text-3xl text-center mb-6">Edit Car</p>
      <div className="flex flex-wrap gap-8">
        {/* First Column */}
        <div className="ml-[50px]">
          {/* Car ID */}
          <div className="mb-4">
            <label className="block text-[#003066] text-base mb-2">Car ID</label>
            <input
              className="w-full rounded-md bg-gray-200 h-8 px-3 border border-white placeholder:text-[#003066] placeholder:text-sm"
              type="text"
              placeholder="Enter the Car ID"
              name="carid"
              value={car.carid}
              onChange={handleChange}
              required
            />
          </div>

          {/* Car Number */}
          <div className="mb-4">
            <label className="block text-[#003066] text-base mb-2">Car Number</label>
            <input
              className="w-full rounded-md bg-gray-200 h-8 px-3 border border-white placeholder:text-sm"
              type="text"
              placeholder="Enter the Car Number"
              name="carnumber"
              value={car.carnumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Car Name */}
          <div className="mb-4">
            <label className="block text-[#003066] text-base mb-2">Car Name</label>
            <select
              className="w-full rounded-md bg-gray-200 h-8 px-3 border border-white placeholder:text-sm"
              name="carname"
              value={car.carname}
              onChange={handleChange}
              required
            >
              <option value="">Select Car</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Honda">Honda</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Maruti Suzuki">Maruti Suzuki</option>
              <option value="Tata">Tata</option>
            </select>
          </div>

          {/* Car Rent */}
          <div className="mb-4">
            <label className="block text-[#003066] text-base mb-2">Car Rent</label>
            <input
              className="w-full rounded-md bg-gray-200 h-8 px-3 border border-white placeholder:text-sm"
              type="text"
              placeholder="Enter the Rent Price"
              name="carrent"
              value={car.carrent}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Second Column */}
        <div className="ml-[20px]">
          {/* Year */}
          <div className="mb-4">
            <label className="block text-[#003066] text-base mb-2">Year</label>
            <input
              className="w-full rounded-md bg-gray-200 h-8 px-3 border border-white placeholder:text-sm"
              type="text"
              placeholder="Enter the Manufacturing Year"
              name="year"
              value={car.year}
              onChange={handleChange}
              required
            />
          </div>

          {/* Transmission */}
          <div className="mb-4">
            <label className="block text-[#003066] text-base mb-2">Transmission</label>
            <input
              className="w-full rounded-md bg-gray-200 h-8 px-3 border border-white placeholder:text-sm"
              type="text"
              placeholder="Enter the Transmission Type"
              name="transmission"
              value={car.transmission}
              onChange={handleChange}
            />
          </div>

          {/* Upload Image */}
          <div className="mb-4">
            <label className="block text-[#003066] text-base mb-2">Upload Image</label>
            <input
              type="file"
              className="w-full bg-gray-200 rounded-md h-10 px-3 border border-white placeholder:text-sm"
              // onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="w-full h-12 font-bold text-white text-lg rounded-lg bg-[#003066] hover:bg-blue-700 transition-colors"
        type="submit"
      >
        Update Car
      </button>
    </div>
  </form>
</div>
</div>
  );
};

export default EditCar;
