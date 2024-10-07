import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignUp = () => {

  const [formData, setFormData ] = useState({})
  const [loading, setLoading ] = useState(false)
  const [error, setError ] = useState(null)
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData(
      {
        ...formData,
      [e.target.id] : e.target.value
      }
    )
  }
  console.log(formData)

  const handleOnSubmit = async(e)=>{
    
    setLoading(true)
    e.preventDefault();
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    
      const data = await response.json();
      console.log(data)
      setFormData({})
      setLoading(false)
      navigate('/signin')
    
  }

  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl text-center font-semibold  my-7' >Sign up</h1>
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 '>
        <input type="text"
        placeholder='Username'
        className='border p-3 rounded-lg'
        id='username'
        onChange={handleOnChange} />

        <input type="email"
        placeholder='Email'
        className='border p-3 rounded-lg'
        id='email'
        onChange={handleOnChange} />

        <input type="password"
        placeholder='password'
        className='border p-3 rounded-lg'
        id='password'
        onChange={handleOnChange} />

        <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >{loading? 'Loading...': 'Sign Up'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5' >
        <p>Have an account?</p>
        <Link to={'/signin'} >
          <span className='text-blue-700' >Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp