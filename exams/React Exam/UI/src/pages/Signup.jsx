import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usertype, setUsertype] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newuser = {
            username,
            email,
            password,
            usertype,
        };
        try {
            const response = await fetch('/api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newuser),
            });
            if (response.ok) {
                alert("Signup successfully completed");
                navigate('/');
            }
        } catch (error) {
            console.log("The error is", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='h-[500px] w-[500px] justify-center bg-blue-400 rounded-md'>
                    <label htmlFor="username" className='text-blue-900 font-bold'>Username</label><br />
                    <input
                        type="text"
                        className='w-[350px] h-[30px] p-2 rounded-md'
                        value={username}
                        id='username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <label htmlFor="email" className='text-blue-900 font-bold'>Email ID</label><br />
                    <input
                        type="text"
                        className='w-[350px] h-[30px] p-2 rounded-md'
                        value={email}
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <label htmlFor="password" className='text-blue-900 font-bold'>Password</label><br />
                    <input
                        type='password'
                        className='w-[350px] h-[30px] p-2 rounded-md'
                        value={password}
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <label htmlFor="usertype" className='text-blue-900 font-bold'>User Type</label><br />
                    <select
                        name="usertype"
                        className='w-[350px] h-[30px] p-2 rounded-md'
                        id='usertype'
                        value={usertype}
                        onChange={(e) => setUsertype(e.target.value)}
                    >
                        <option value="" disabled>Select user type</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <br />
                    <button className='bg-blue-900 text-white p-2 rounded-md'>Signup</button>
                    <p>Already have an account? <Link to='/' className='text-blue-900'>Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
