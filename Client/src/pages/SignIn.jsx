import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice.js'
import OAuth from '../components/OAuth.jsx'

const SignIn = () => {

  const [formData, setFormData ] = useState({})
  const {loading, error } = useSelector((state) => state.user)
  // const [err, setError] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    // setLoading(true)
    
      try {
          dispatch(signInStart());
      e.preventDefault();
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
        const data = await response.json();
        if(data.success === false){
          dispatch(signInFailure(data.message))
          return;
        }
        console.log('sign-in data : ', data)
        setFormData({})
        // setLoading(false)
        dispatch(signInSuccess(data))
        navigate('/')
      } catch (error) {
        dispatch(signInFailure(error.message))
      }
    
    
  }

  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl text-center font-semibold  my-7' >Sign In</h1>
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 '>
      
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

        <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >{loading? 'Loading...': 'Sign In'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5' >
        <p>Do not have an account?</p>
        <Link to={'/signup'} >
          <span className='text-blue-700' >Sign Up</span>
        </Link>
      </div>
      {/* <p className='text-center' >
        {
          error   ? (<span className='text-red-700 font-bold' >{error} </span>) : ('')
        }
      </p> */}
    </div>
  )
}

export default SignIn