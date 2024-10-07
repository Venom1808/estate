import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider)

            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL})
            })

            const data = await response.json();
            console.log(data)
            dispatch(signInSuccess(data));
            navigate('/')

        } catch (error) {
            console.log("error in signing in with google", error)
        }
    }
  return (
    <button onClick={handleGoogleClick} className='bg-red-700 text-white p-3 rounded-lg uppercase hover: opacity-95' type='button' >Continue With Google</button>
  )
}

export default OAuth