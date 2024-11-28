import React ,{useState}from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import logo from '../assets/images/carl.png'
import backimg from '../assets/images/car1.jpg'
const Login = () => {
  const [username,setusername]= useState('');
  const [password,setPassword]= useState('');
  const navigate=useNavigate();
  const loginSubmit =async (e) =>{
      e.preventDefault();
      const loginDetails= {
          username,
          password,
      };
      const res =await fetch('/api/login',{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(loginDetails),
          credentials:'include',

      })
      if(res.ok){
          const data =await res.json();
          localStorage.setItem('username',username);
        alert(`logged in as  ${data.userType}`)
          navigate('/home');
      }
      else{
         alert('Please check your credentials');
      }
  }
  return (
    
     <><div className="bg-[url('/images/car1.jpg')] bg-cover" style={{backgroundImage:`url(${backimg})`}}>
     <div className="flex" >
          <div className="font-bold text-5xl  ml-[50px] mt-[25px] text-white">CARGO</div>&nbsp;&nbsp;
          <div><img className="h-[65px] mt-[20px] ml-[30px] " src={logo} alt=""/></div>
      </div>
      <br />
     <br/>
 <form action=""   onSubmit={loginSubmit}>
 <div className="h-[390px] w-[350px] ml-[100px] bg-sky-600/40 rounded-2xl ">  
     <p className="font-bold text-white text-5xl text-center leading-loose">Login </p>
     <label className=" text-xl text-white ml-[40px] leading-loose" for="">UserName :</label><br/>
     <input className="h-8 w-[250px] rounded-lg ml-[40px] leading-loose bg-white placeholder:text-[12px] " type="text"  placeholder="  Enter your username"
     id="username"
     value={username}
     onChange={(e) => setusername(e.target.value)}/>
     <br/>
     <label className="text-xl text-white ml-[40px] leading-loose" for="">Password :</label>
     <br/>
     <input className="h-8 w-[250px] rounded-lg ml-[40px] leading-loose  hover:bg-white placeholder:text-[12px]" type="password" placeholder="  Enter your password"
      id="password"  value={password}
      onChange={(e) => setPassword(e.target.value)}/>
     <br/>
     <div className="h-12">
         <button className="h-8 ml-[40px] font-bold text-white text-lg rounded-lg mt-6 bg-[#003066] text-center w-[250px] hover:h-10 hover:bg-[#003066]/50">Login</button>
     </div>
     <p className=" ml-[40px] text-white font-bold text-md mt-8">Don't have an Account? <Link className="text-[#002b5c] hover:text-xl" to="/Signup">Sign Up</Link></p>
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

export default Login