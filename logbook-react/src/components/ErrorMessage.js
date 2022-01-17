import React from 'react'

export const ErrorMessage = ({ message }) => {
    return (
        <div className="text-sm text-red-500">
            {`* ${message}`}
        </div>
    )
}
