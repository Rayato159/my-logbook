import React, { useState } from 'react'

// Components
import { ResNavButton } from './ResNavButton'
import { NavButton } from './NavButton'
import { Logo } from './Logo'

// Redux
import { useDispatch } from 'react-redux'
import { logout } from '../features/loginSlice'

export const Navbar = ({ user }) => {

    const [isShowToggle, setIsShowToggle] = useState(false)

    const dispatch = useDispatch()

    return (
        <nav className="bg-myrose-300 sticky top-0 w-full z-50">
            <div className="max-w-6xl mx-auto">
                <div className="flex py-3 justify-between">
                    <div className="flex space-x-4">
                        {/* Logo */}
                        <div className="flex space-x-1 cursor-pointer text-white">
                            {/* Mobile Toggle */}
                            {user &&
                                <button onClick={() => setIsShowToggle(!isShowToggle)} className="md:hidden flex items-center hover:text-gray-300 mx-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            }
                            <Logo />
                        </div>

                        {/* Searchbox */}
                        <div className="hidden md:flex relative items-center justify-end">
                            <form>
                                <input type="text" className="px-4 py-1 rounded-full focus:outline-none" placeholder="Search" />
                            </form>
                            <button className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 bg-white text-gray-500 hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        {user && <NavButton message={user.username}/>}
                        {user.username && <button onClick={() => dispatch(logout())} className="font-bold text-xl text-white hover:text-gray-300 items-center">
                                    Logout
                                </button>}
                    </div>
                </div>
                {/* Mobile Toggle */}
                {isShowToggle?
                    <div className="flex flex-col">
                        {/* Username */}
                        {user && <ResNavButton message={user.username}/>}
                        {/* Logout */}
                        {user.username && 
                            <div className="block hover:bg-myrose-400">
                                <button onClick={() => dispatch(logout())} className="w-full text-left p-3 font-bold text-xl text-white">
                                    Logout
                                </button>
                            </div>
                        }
                    </div>:null
                }
            </div>
        </nav>
    )
}
