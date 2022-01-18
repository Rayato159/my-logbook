import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { taskOneLoading, taskOneSuccess, taskOneFail } from '../features/taskOneSlice'

// Components
import { SubmitButton } from '../components/SubmitButton'
import { Input } from '../components/Input'
import { ErrorMessage } from '../components/ErrorMessage'

// API
import { createTask } from '../api/TaskAPI'

export const AddTask = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const { isLoading, errors } = useSelector((state) => state.taskOne)
    const { userInfo } = useSelector((state) => state.user)

    const onSubmitHandle = async (e) => {
        e.preventDefault()

        dispatch(taskOneLoading())
        try {
            const res = await createTask(title, description)
            dispatch(taskOneSuccess(res))
            navigate('/home')
        } catch(e) {
            dispatch(taskOneFail(e.message))
        }
    }

    if(!userInfo) {
        navigate('/home')
    }
    
    return (
        <div>
            <div className="md:max-w-sm max-w-xs mx-auto my-10">
                <div className="shadow-lg p-6 bg-white">
                    <div className="flex flex-col justify-center space-y-6">
                        {/* Login Header */}
                        <div className="flex justify-center items-center space-x-1">
                            <div className="flex text-3xl">
                                📝
                            </div>
                            <div className="font-bold text-2xl">
                                Add Task
                            </div>
                        </div>

                        {/* Login Form */}
                        <div className="flex flex-col space-y-3">
                            <Input message={"Title"} type={"text"} onChangeHandle={(value) => setTitle(value)}/>
                            <div>
                                <div className="flex space-x-1 items-center mb-1">
                                    <label className="font-bold text-md">Description</label>
                                    <label className="font-bold text-red-500">*</label>
                                </div>
                                <textarea onChange={(e) => setDescription(e.target.value)} className="p-2 w-full border-b-2 border-slate-600 bg-slate-300 focus:outline-none focus:bg-slate-200 duration-300" rows="6" cols="50"></textarea>
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
                                    <SubmitButton message={"Pending..."} beauty={"w-full p-2 border-b-2 border-slate-600 bg-slate-300 focus:outline-none focus:bg-slate-200 duration-300"} />
                                    :
                                    <button onClick={onSubmitHandle} type="submit" className="w-full bg-slate-800 hover:bg-slate-600 rounded font-bold text-xl text-white p-1">
                                        Add Task
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