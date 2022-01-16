import React from 'react'

export const SubmitButton = ({ message, beauty }) => {
    return (
        <button type="submit" className={beauty}>
            {message}
        </button>
    )
}
