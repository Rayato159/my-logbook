import React from 'react'

export const NavButton = ({ message }) => {
    return (
        <button className="font-bold text-xl text-white hover:text-gray-300 items-center cursor-pointer">
            🧬{message}
        </button>
    )
}
