import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'


const Profile = () => {

  const {currentUser} = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [file,setFile] = useState(undefined)
  const [filePercentage, setFilePercentage ] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData ] = useState({})
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings ] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // console.log('logging the file',file)
  // console.log("file percentage completed : ", filePercentage)
  // console.log("formdata is : ", formData)

  /***********************************ONCHANGE EVENT DEFINED ************************ */
  const handleOnChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });

  }

  /*****************************USE EFFECT HOOK*********************************** */

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file])

   /********************************FILE UPLOAD FUNCTION START ******************************** */

  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,file)
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      // console.log('upload is ' + progress + '% done ');
      setFilePercentage(Math.round(progress))
    },
    (error) => {
      setFileUploadError(true)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        setFormData({ ...formData, avatar: downloadUrl})
      })
    }
    )

  }
  /********************************FILE UPLOAD FUNCTION FINISHED******************************** */

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("update button cliked!!")
    console.log("id of user is : ", currentUser);
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser.rest._id} `,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json()

      if(data.success === false){
        dispatch(updateFailure(data.message))
        return;
      }
      dispatch(updateSuccess(data))

    } catch (error) {
      console.log("inside catch block of update button")
      dispatch(updateFailure(error.message))
    }
  }

  const handleDeleteUser = async() => {
    console.log("delete user handle hit")
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser.rest._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      console.log("data after delete: ", data)
      if(data.success === false ){
        dispatch(deleteUserFailure(data.message))
        return ;
      }
      dispatch(deleteUserSuccess(data))
      navigate('/signin')

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }

  }

  const handleSignOut = async () => {
    try {
      console.log("sign out handle hit")
      dispatch(deleteUserStart())
      const res = await fetch('/api/user/signout')
      const data = await res.json();
      if(data.success === false ){
        dispatch(deleteUserFailure(data.message))
      }
      dispatch(deleteUserSuccess(data))
      navigate('/signin')
    } catch (error) {
      
    }
  }

  const handleShowListings = async() => {
    try {
      console.log("handle show listings clicked")
      setShowListingsError(false);
      console.log("currentuser ki id is : ", currentUser.rest._id)
      const res = await fetch(`/api/user/listing/${currentUser.rest._id}`)
      const data = await res.json();
      console.log("data aa gya ji ;", data)
      if(data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data)
    } catch (error) {
      console.log("inside catch block")
      setShowListingsError(true)
    }
  }

  /**************************************HANDLE DELETE LISTING*************************** */
    const handleDeleteListing = async(id) => {
      try {
        const res = await fetch(`/api/listing/delete/${id}`, {
          method : 'DELETE',
        });
        const data = await res.json();
        if(data.success === false){
          console.log(data.message)
          return; 
        }
        setUserListings((prev) => prev.filter((listing) => listing._id !== id));
      } catch (error) {
        console.log(error.message)
      }
    }

  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl font-bold text-center my-7' >Profile</h1>

      {/* ********************************FORM IS HERE******************************** */}

      <form   onSubmit={handleOnSubmit} className='flex flex-col gap-4' >
        <input  onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img  onClick={() => fileRef.current.click()} src={ formData.avatar || currentUser.rest.avatar} alt="ProfileImg" className=' self-center border-2 rounded-full h-24 w-24 object-cover cursor-pointer ' />
        <p>
          {
            fileUploadError ? (<span className='text-red-700 ' >Error Image Upload (image must be less than 2 mb)</span> ) : filePercentage > 0 && filePercentage < 100 ? (<span className='text-slate-700' >{`Uploading ${filePercentage}%` }</span>) : filePercentage === 100 ? (
              <span className='text-green-700 text-center' >Uploaded Succesfully </span>) : ("")
            
          }
        </p>
        <input 
        type="text"
        placeholder='username'
        defaultValue={currentUser.rest.username}
        id='username'
        className='border p-3 rounded-lg'
        onChange = {handleOnChange} />
        
        <input 
        type="email"
        placeholder='email'
        defaultValue={currentUser.rest.email}
        id='email'
        className='border p-3 rounded-lg'                              
        onChange = {handleOnChange} />
        <input 
        type="password"
        placeholder='password'
        id='password'
        className='border p-3 rounded-lg' 
        onChange = {handleOnChange} />
        
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80' >Update</button>
        <Link to={'/create-listing'} className='bg-green-700  text-white p-3 rounded-lg uppercase text-center hover:opacity-95 ' >
          Create Listing
        </Link>
        
      </form>


      <div className='flex justify-between mt-5' >
        <span className='text-red-500 cursor-pointer' onClick={handleDeleteUser} >Delete account</span>
        <span className='text-red-500 cursor-pointer' onClick={handleSignOut}>Sign Out</span>
      </div>

      <button  type='button' className='text-green-700 w-full ' onClick={handleShowListings} > Show Listings</button>
      <p className='text-red-700 mt-5' >{showListingsError ? 'error showing listings' : ""}</p>
      
      {
        userListings && userListings.length>0 && 
        <div className='flex flex-col gap-5' >
          <h1 className='text-center font-extrabold font-serif text-3xl mt-8 mb-2 text-amber-800' >Your Listings</h1>
          {userListings.map((listing) => (
          <div  key={listing._id} className=" gap-4 flex justify-between p-3 border border-slate-300 items-center rounded">

            <Link to={`/listing/${listing._id} `} >
              <img  className='h-16 w-16 object-contain rounded-lg ' src={listing.imageUrls[0]} alt="listing cover" />  
            </Link>

            <Link  className='flex-1 font-semibold text-normal text-slate-700  hover:underline truncate' to={`/listing/${listing._id} `} >

            <p className=' ' >{listing.name}</p>

            </Link>

            <div className='flex flex-col gap-3' >
              <button className='text-red-800  font-semibold uppercase' onClick={() => handleDeleteListing(listing._id)} >Delete</button>
              <Link to={`/update-listing/${listing._id}`} >
              <button className='text-green-800 uppercase' >Edit</button>
              </Link>
            </div>
            
            

          </div>
        ))}
        </div>
      }

    </div>
  )
}

export default Profile