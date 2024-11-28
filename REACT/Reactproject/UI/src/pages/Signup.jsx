import React ,{useState} from 'react'
import logo from '../assets/images/carl.png'
import backimg from '../assets/images/car1.jpg'
import { Link ,useNavigate} from 'react-router-dom'
const Signup = () => {
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const[userType,setuserType]=useState('admin');
  const navigate = useNavigate();
   const signupSubmit = async (userDetails) =>{
      const res =await fetch (`/api/register`,{
          method: 'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(userDetails),
      });
      if(res.ok){
          // toast.success('User created successfully');
          alert('User created successfully')
          navigate('/');
      }
      // else if(res===404){
      //   console.log("try",error)
      // }
      else{
          alert('Error creating user');
         
      }
   }
   const submitForm=(e)=>{
      e.preventDefault();
      const userDetails={
          username,
          password,
          number,
          userType
      };
      signupSubmit(userDetails);

   }
  return (
    <><div className="bg-[url('/images/car1.jpg')] bg-cover" style={{backgroundImage:`url(${backimg})`}}>
   <div className="flex" >
        <div className="font-bold text-5xl  ml-[50px] mt-[20px] text-white">CARGO</div>&nbsp;&nbsp;
        <div><img className="h-[65px] mt-[15px] ml-[30px] " src={logo} alt=""/></div>
    </div>
    <br />
   <form action="" onSubmit={submitForm}>
   <div className="h-[420px] w-[340px] ml-[200px] bg-sky-600/40 rounded-2xl ">
        
        <p className="font-bold text-white text-4xl text-center leading-relaxed">Sign Up </p>
        <label className=" text-xl text-white ml-[40px] leading-loose" for="">UserName :</label><br/>
        <input className="h-8 w-[250px] rounded-lg ml-[40px] leading-loose bg-white placeholder:text-[12px]" type="text" placeholder="  Enter your username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}/>
        <br/>
        <label className=" text-xl text-white ml-[40px] leading-loose" for="">Mobile No :</label><br/>
        <input className="h-8 w-[250px] rounded-lg ml-[40px] leading-loose bg-white placeholder:text-[12px]" type="text" placeholder="  Enter your Number"
          value={number}
          onChange={(e)=>setNumber(e.target.value)}/>
        <br/>
        <label className="text-xl text-white ml-[40px] leading-loose" for="">Password :</label>
        <br/>
        <input className="h-8 w-[250px] rounded-lg ml-[40px] leading-loose  hover:bg-white placeholder:text-[12px]" type="password" placeholder="  Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
        <br/>
        <label className="text-xl text-white ml-[40px] leading-loose" for="">UserType :</label>
        <br/>
        <select
          id="userType"
          name="userType"
          value={userType}
          onChange={(e)=>setuserType(e.target.value)}
          className="h-8 w-[250px] rounded-lg ml-[40px] leading-loose  hover:bg-white placeholder:text-[12px]"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <br/>
        <div className="h-12">
            <button className="h-8 ml-[40px] font-bold text-white text-lg rounded-lg mt-6 bg-[#003066] text-center w-[250px] hover: hover:bg-[#003066]/50">Sign Up</button>
        </div>
        
        <p className=" ml-[40px] text-white font-bold text-md mt-8">Already have an Account? <Link className="text-[#002b5c] hover:text-xl" to="/">Login</Link></p>



    </div>
   </form>
    <div>
 <br/>
 <br/>
 <br/>
 <br/>
</div>
 
    </div>
    </>
  )
}

export default Signup