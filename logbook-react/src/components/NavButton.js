import React from 'react'

export const NavButton = ({ message }) => {
    return (
        <div className="font-bold text-xl text-white hover:text-gray-300 items-center cursor-pointer">
            {message}
        </div>
    )
}
