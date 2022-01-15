import React from 'react'

export const SubmitButton = ({ message }) => {
    return (
        <button type="submit" className="w-full bg-myrose-300 hover:bg-myrose-400  rounded font-bold text-xl text-myrose-500 p-1">
            {message}
        </button>
    )
}
