import React from 'react'

export const Input = ({ message, type, onChangeHandle, options }) => {
    return (
        <div>
            <div className="flex space-x-1 items-center">
                <label className="font-bold text-md">{message}</label>
                <label className="font-bold text-red-500">*</label>
            </div>
            {options?
                <div className="flex relative justify-end items-center">
                    <input onChange={(e) => onChangeHandle(e.target.value)} type={type} className="w-full p-2 rounded focus:outline-none" />
                    {options}
                </div>:
                <input onChange={(e) => onChangeHandle(e.target.value)} type={type} className="w-full p-2 rounded focus:outline-none" />
            }
        </div>
    )
}
