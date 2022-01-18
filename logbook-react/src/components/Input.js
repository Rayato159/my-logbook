import React from 'react'

export const Input = ({ message, type, onChangeHandle, options }) => {
    return (
        <div className="py-1">
            <div className="flex space-x-1 items-center">
                <label className="font-bold text-md">{message}</label>
                <label className="font-bold text-red-500">*</label>
            </div>
            {options?
                <div className="flex relative justify-end items-center">
                    <input onChange={(e) => onChangeHandle(e.target.value)} type={type} className="w-full p-2 border-b-2 border-gray-600 focus:bg-slate-300 focus:outline-none duration-300" />
                    {options}
                </div>:
                <input onChange={(e) => onChangeHandle(e.target.value)} type={type} className="w-full p-2 border-b-2 border-gray-600 focus:bg-slate-300 focus:outline-none duration-300" />
            }
        </div>
    )
}

// focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
// w-full p-2 rounded focus:outline-none