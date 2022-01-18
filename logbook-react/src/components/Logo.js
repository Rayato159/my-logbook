import React from 'react'
import { Link } from 'react-router-dom'

export const Logo = () => {
    return (
        <Link to="/home" className="flex hover:text-gray-300 space-x-1 mx-2 text-white cursor-pointer">
            <div className="flex items-center mr-2 text-2xl">
                👨🏽‍💻
            </div>
            <div className="font-bold text-xl">
                MyLogbook
            </div>
        </Link>
    )
}
