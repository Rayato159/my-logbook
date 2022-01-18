import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Components
import { ResNavButton } from './ResNavButton'
import { NavButton } from './NavButton'
import { Logo } from './Logo'

// Redux
import { useDispatch } from 'react-redux'
import { userSuccess } from '../features/userSlice'
import { logout } from '../features/loginSlice'
import { searchSuccess } from '../features/searchSlice'

export const Navbar = ({ user }) => {
    
    const [isShowToggle, setIsShowToggle] = useState(false)
    const [searchKey, setSearchKey] = useState("")

    const dispatch = useDispatch()

    const onClickHandle = () => {
        if(window.confirm("Are you sure?")) {
            dispatch(logout())
            dispatch(userSuccess(null))
        }
    }

    const submitSearchHandle = (e) => {
        e.preventDefault()

        dispatch(searchSuccess(searchKey))
    }

    return (
        <nav className="bg-slate-800 sticky top-0 w-full z-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex py-3 justify-between">
                    <div className="flex space-x-4">
                        {/* Logo */}
                        <Link to="/home" className="flex space-x-1 cursor-pointer text-white">
                            {/* Mobile Toggle */}
                            {user &&
                                <button onClick={() => setIsShowToggle(!isShowToggle)} className="md:hidden flex items-center hover:text-gray-300 mx-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            }
                        </Link>
                        <Logo />

                        {/* Searchbox */}
                        <form onSubmit={submitSearchHandle} className="hidden md:flex relative items-center justify-end">
                            <div>
                                <input onChange={(e) => setSearchKey(e.target.value)} type="text" className="px-4 py-1 rounded-full focus:outline-none" placeholder="Search" />
                            </div>
                            <button type="submit" className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 bg-white text-gray-500 hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        {user && <NavButton message={user.username}/>}
                        {user && <button onClick={onClickHandle} className="font-bold text-xl text-white hover:text-gray-300 items-center">
                                    Logout
                                </button>
                        }
                        {user && <Link to="/home/add_task" className="font-bold text-xl text-black items-center bg-amber-300 px-2 rounded hover:scale-110 transition-transform duration-300">
                                    +Task 📝
                                </Link>
                        }
                    </div>
                </div>
                {/* Mobile Toggle */}
                {isShowToggle?
                    <div className="md:hidden flex flex-col">
                        {/* Username */}
                        {user && <ResNavButton message={user.username}/>}
                        {/* Logout */}
                        {user && 
                            <button onClick={onClickHandle} className="block hover:bg-slate-600  w-full text-left p-3 font-bold text-xl text-white">
                                Logout
                            </button>
                        }
                        {user && <Link to="/home/add_task" className="block hover:bg-slate-600 w-full text-left p-3 font-bold text-xl text-white">
                                    Add Post
                                </Link>
                        }
                    </div>:null
                }
            </div>
        </nav>
    )
}
