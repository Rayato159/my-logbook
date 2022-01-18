import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { taskOneLoading, taskOneSuccess, taskOneFail } from '../features/taskOneSlice'

// Components
import { SubmitButton } from '../components/SubmitButton'
import { ErrorMessage } from '../components/ErrorMessage'

// API
import { updateTask } from '../api/TaskAPI'

export const EditTask = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [taskOneInfo , { userInfo }] = useSelector((state) => [
        state.taskOne.taskOneInfo,
        state.user,
    ])

    if(!userInfo) {
        navigate('/home')
    }

    const [title, setTitle] = useState(taskOneInfo.title)
    const [description, setDescription] = useState(taskOneInfo.description)

    const { isLoading, errors } = useSelector((state) => state.taskOne)

    const onSubmitHandle = async (e) => {
        e.preventDefault()

        dispatch(taskOneLoading())
        try {
            const res = await updateTask(taskOneInfo.id, title, description)
            dispatch(taskOneSuccess(res))
            navigate('/home')
        } catch(e) {
            dispatch(taskOneFail(e.message))
        }
    }

    return (
        <div>
            <div className="md:max-w-sm max-w-xs mx-auto my-10">
                <div className="shadow-lg p-6 bg-white">
                    <div className="flex flex-col justify-center space-y-6">
                        {/* Login Header */}
                        <div className="flex justify-center items-center space-x-1">
                            <div className="flex text-3xl">
                                🔨
                            </div>
                            <div className="font-bold text-2xl">
                                Edit Task
                            </div>
                        </div>

                        {/* Login Form */}
                        <div className="flex flex-col space-y-3">
                            <div>
                                <div className="flex space-x-1 items-center">
                                    <label className="font-bold text-md">Title</label>
                                    <label className="font-bold text-red-500">*</label>
                                </div>
                                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="w-full p-2 border-b-2 border-slate-600 bg-slate-300 focus:outline-none focus:bg-slate-200 duration-300" />
                            </div>
                            <div>
                                <div className="flex space-x-1 items-center mb-1">
                                    <label className="font-bold text-md">Description</label>
                                    <label className="font-bold text-red-500">*</label>
                                </div>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 w-full border-b-2 border-slate-600 bg-slate-300 focus:outline-none focus:bg-slate-200 duration-300" rows="6" cols="50"></textarea>
                            </div>
                            {errors.length > 0 &&
                                <div className="p-2 bg-red-300 border border-red-500">
                                    {errors.map((e, i) => {
                                        return (
                                            <ErrorMessage key={i} message={e}/>
                                        )
                                    })}
                                </div>
                            }
                            <div className="pt-3">
                                {isLoading?
                                    <SubmitButton message={"Pending..."} beauty={"w-full bg-myrose-400  rounded font-bold text-xl text-myrose-500 p-1"} />
                                    :
                                    <button onClick={onSubmitHandle} type="submit" className="w-full bg-slate-800 hover:bg-slate-600  rounded font-bold text-xl text-white p-1">
                                        Submit
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}