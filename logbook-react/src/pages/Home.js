import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// API
import { getTasks } from '../api/TaskAPI'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { taskLoading, taskSuccess, taskFail } from '../features/taskSlice'

export const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, { taskInfo }] = useSelector((state) => [
        state.user,
        state.task,
    ])

    if(!user.userInfo) {
        navigate('/')
    }

    useEffect(() => {
        async function fetchTasks() {
            try {
                const res = await getTasks()
                dispatch(taskSuccess(res.sort((a, b) =>  new Date(b.created) - new Date(a.created))))
            } catch(e) {
                dispatch(taskFail(e.message))
            }
        }

        dispatch(taskLoading())
        fetchTasks()
    }, [])

    return (
        <div className="my-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col space-y-6">
                    {
                        taskInfo.map((task) => {
                            return (
                                <div className="flex flex-col border-2 rounded-md border-myrose-500 bg-myrose-200 p-4 mx-4">
                                    <div className="font-bold">
                                        📝 {task.title}
                                    </div>
                                    <div className="text-sm">
                                        📅 Date: {task.created}
                                    </div>
                                    <div className="ml-6">
                                        {task.description}
                                    </div>
                                    <div className="flex space-x-3 justify-end">
                                        <button className="font-bold text-md rounded bg-sky-500 px-2 hover:scale-125 transition-transform duration-300">
                                            ✏️
                                        </button>
                                        <button className="font-bold text-md rounded bg-red-500 px-2 hover:scale-125 transition-transform duration-300">
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
