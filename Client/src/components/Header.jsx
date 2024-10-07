import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    const {currentUser} = useSelector((state) => state.user )
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3' >
            <Link to= '/' >
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap' >
                    <span className='text-slate-500' >Ansh </span>
                    <span className='text-slate-700' >Estate</span>
                </h1>
            </Link>
            <form  onSubmit={handleOnSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center '>
                <input 
                type="text"
                placeholder='Search...'
                onChange={(e) => setSearchTerm(e.target.value)}
                className='bg-transparent focus:outline-none w-24 sm:w-64'
                />
                <button>
                    <CiSearch className='text-slate-600' />
                </button>
            </form>
            <ul className='flex gap-4' >
                <Link to= '/'>
                    <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer' >Home</li>
                </Link>
                <Link to='/about' >
                    <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer ' >About</li>
                </Link>
                <Link  to='/profile'>
                    {
                        currentUser ? (<img src={currentUser.rest.avatar} className='rounded-full w-12 h-12 ' ></img>)
                         :(<li className=' text-slate-700 hover:underline cursor-pointer' >Sign In</li>)
                    }
                </Link>
            </ul>
        </div>
    </header>
  )
}

export default Header