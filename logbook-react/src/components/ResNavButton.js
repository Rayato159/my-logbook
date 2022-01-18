import React from 'react'

export const ResNavButton = ({ message }) => {
    return (
        <div className="block p-3 font-bold text-xl text-white hover:bg-slate-600  cursor-pointer">
            {message}
        </div>
    )
}
