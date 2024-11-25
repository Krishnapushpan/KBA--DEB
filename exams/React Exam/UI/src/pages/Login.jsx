import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = { username, password };

    try {
      const res = await fetch('/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
        credentials: 'include', // Include credentials (e.g., cookies)
      });

      if (res.ok) {
        const data = await res.json();
        alert("Successfully logged in");
        navigate('/home');
      } else {
        alert("Please check your credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={loginSubmit}>
        <div className='h-[500px] w-[400px] justify-center bg-blue-400 rounded-md'>
          <label htmlFor="username" className='text-blue-900 font-bold'>Username</label><br />
          <input
            type="text"
            className='w-[350px] h-[30px] p-2 rounded-md'
            value={username}
            id='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="password" className='text-blue-900 font-bold'>Password</label><br />
          <input
            type='password'
            className='w-[350px] h-[30px] p-2 rounded-md'
            value={password}
            id='password' // Fixed ID typo
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className='bg-blue-900 text-white p-2 rounded-md'>Login</button>
          <p>
            Don't have an account? <Link to='/Signup' className='text-blue-900'>Signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
