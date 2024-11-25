import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom';
const AddService = () => {
    const [serviceno,setServiceno]=useState('');
    const [vehicleno,setVehicleno]=useState('');
    const [servicetype,setServicetype]=useState('');
    const [vehicletype,setVehicletype]=useState('');
    const [servicedate,setServicedate]=useState('');
    const [servicetime,setServicetime]=useState('');
    const [ownername,setOwnername]=useState('');
    const navigate =useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const newservice ={
            serviceno,
            vehicleno,
            servicetype,
            vehicletype,
            servicedate,
            servicetime,
            ownername            
        }
        try{
            const response =  await fetch('/api/addvehicle',
                {
                    method:"POST",
                    headers:{'Content-Type':'application/json'},
                    // credentials:"include",
                    body:JSON.stringify(newservice)

                }
            )
            if(response.status === 403)
            {
              alert("you have no permission");
              navigate('/Home')
            }
             else if(response.ok){
                alert("Service Added Successfully");
                navigate('/Home')

            }
            else{
                alert("Failed to Add Service");
            }
        }
        catch(error){
            console.error("this is the error",error);
        }
    }
  return (
        <div className="">
          <form
            onSubmit={handleSubmit} 
            className="bg-white p-8 rounded-lg ">
            <h2 className="text-2xl ">Add Service Details</h2>
    
            <div className="mb-4">
              <label htmlFor="serviceno" className="">Service Number</label>
              <input
                type="text"
                name="serviceno"
                value={serviceno}
                onChange={(e)=>setServiceno(e.target.value)}
                className=""
                placeholder="Enter Service Number"/>
            </div>
    
            <div className="mb-4">
              <label htmlFor="vehicleno" className="block text-sm font-medium text-gray-700">Vehicle Number</label>
              <input
                type="text"
                name="vehicleno"
                value={vehicleno}
                onChange={(e)=>setVehicleno(e.target.value)}
                className=""
                placeholder="Enter Vehicle Number"/>
            </div>
    
            <div className="mb-4">
              <label htmlFor="vehicletype" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <input
                type="text"
                name="vehicletype"
                value={vehicletype}
                onChange={(e)=>setVehicletype(e.target.value)}
                className=""
                placeholder="Enter Vehicle Type"/>
            </div>
    
            <div className="mb-4">
              <label htmlFor="servicetype" className="block text-sm font-medium text-gray-700">
                Service Type </label>
              <input
                type="text"
                name="servicetype"
                value={servicetype}
                onChange={(e)=>setServicetype(e.target.value)}
                className=""
                placeholder="Enter Service Type"/>
            </div>
    
            <div className="mb-4">
              <label htmlFor="servicedate" className="block text-sm font-medium text-gray-700">Service Date</label>
              <input
                type="date"
                name="servicedate"
                value={servicedate}
                onChange={(e)=>setServicedate(e.target.value)}
                className=""/>
            </div>
    
            <div className="mb-4">
              <label htmlFor="servicetime" className="">
                Service Time
              </label>
              <input
                type="time"
                name="servicetime"
                value={servicetime}
                onChange={(e)=>setServicetime(e.target.value)}
                className=""
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="ownername" className="block text-sm font-medium text-gray-700">
                Owner Name
              </label>
              <input
                type="text"
                name="ownername"
                value={ownername}
                onChange={(e)=>setOwnername(e.target.value)}
                className=""
                placeholder="Enter Owner Name"
              />
            </div>
    
            <button
              type="submit"
              className=" bg-blue-500">
              Submit Service Details
            </button>
          </form>
        </div>
      );
  
}

export default AddService