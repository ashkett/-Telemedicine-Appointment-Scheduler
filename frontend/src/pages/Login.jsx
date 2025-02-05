<<<<<<< HEAD
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

=======
import React, { useState } from 'react'

const Login = () => {
>>>>>>> da05cc051b69c560ede27383f9ee76b145881147
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

<<<<<<< HEAD
  /*const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up')
      {
        const { data } = await axios.post(`${backendURL}/api/user/register`, { name, password, email });

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else {

        const { data } = await axios.post(`${backendURL}/api/user/login`, { email, password });

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.message)

    }

  }*/
    const onSubmitHandler = async (event) => {
      event.preventDefault();
      
      try {
        if (state === 'Sign Up') {
          const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, password, email });
          
          if (data.success) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            navigate('/'); // Redirect after login
          } else {
            toast.error(data.message);
          }
        } else {
          const { data } = await axios.post(`${backendUrl}/api/user/login`, { password, email });
    
          if (data.success) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            navigate('/');
          } else {
            toast.error(data.message);
          }
        }
      } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        toast.error(error.response ? error.response.data.message : error.message);
      }
    };
    

  /*useEffect( () => {
    if (token) {
        navigate('/')
    }
  },[token])*/
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      navigate('/');
    }
  }, [navigate]);
  

  return (
    <form onSubmit= {onSubmitHandler} className='min-h-[80vh] flex items-center '>
=======
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }

  return (
    <form className='min-h-[80vh] flex items-center '>
>>>>>>> da05cc051b69c560ede27383f9ee76b145881147
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold '>{state === 'Sign Up' ? 'Create Account' : 'Log In'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment</p>

        {
          state === 'Sign Up' && <div className='w-full'>
            <p>Full Name</p>
<<<<<<< HEAD
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} />
=======
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.name)} value={name} />
>>>>>>> da05cc051b69c560ede27383f9ee76b145881147
          </div>
        }

        <div className='w-full'>
          <p>E-mail</p>
<<<<<<< HEAD
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer'>{state === 'Sign Up' ? 'Create Account' : 'Log In'}</button>
=======
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.name)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.name)} value={password} />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer'>{state === 'Sign Up' ? 'Create Account' : 'Log In'}</button>
>>>>>>> da05cc051b69c560ede27383f9ee76b145881147

        {
          state === 'Sign Up'
            ? <p>Already have an account? <span onClick={() => setState('Log In')} className='text-primary underline cursor-pointer'>Log in here</span></p>
            : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login