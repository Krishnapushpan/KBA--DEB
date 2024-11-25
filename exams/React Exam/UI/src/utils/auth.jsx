import {jwtDecode} from 'jwt-decode'

const getUserType = () => {
    const vehicle = document.cookie.split(";").find((row)=>row.startsWith("vehicle"))?.split("=")[1]
    if(!vehicle){
        return null
    }
    try{
        const decoded = jwtDecode(vehicle)
        return decoded.usertype
    }
  catch(error) 
    
  {
    return null
  }
}



export default getUserType