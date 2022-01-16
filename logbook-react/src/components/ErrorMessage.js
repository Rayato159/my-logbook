import React from 'react'

export const ErrorMessage = ({ message }) => {
    return (
        <div className="text-sm text-red-500 bg-red-300 p-1">
            {`* ${message}`}
        </div>
    )
}
