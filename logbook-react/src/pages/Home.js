import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

// API
import { getTasks, getTaskByID, deleteTask } from '../api/TaskAPI'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { taskLoading, taskSuccess, taskFail } from '../features/taskSlice'
import { taskOneLoading, taskOneSuccess, taskOneFail } from '../features/taskOneSlice'

export const Home = () => {

    // Pagination
    const [pageNumber, setPageNumber] = useState(0)
    const tasksPerPage = 5
    const pagesVisited = pageNumber * tasksPerPage
    
    // Navigate
    const navigate = useNavigate()

    // Store
    const dispatch = useDispatch()
    const [user, { taskInfo }, { isLoading, taskOneInfo }] = useSelector((state) => [
        state.user,
        state.task,
        state.taskOne,
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
    }, [taskOneInfo])

    const deleteTaskHandle = async (id) => {

        if(window.confirm(`Delete task: ${id}?`)) {
            dispatch(taskOneLoading())
            deleteTaskByID(id)
        }
    }
    
    async function deleteTaskByID(id) {
        try {
            const res = await deleteTask(id)
            dispatch(taskOneSuccess(res))
        } catch(e) {
            dispatch(taskOneFail(e.message))
        }
    }

    const editTaskHandle = (id) => {
        
        dispatch(taskOneLoading())
        fetchTaskByID(id)
    }

    async function fetchTaskByID(id) {
        try {
            const res = await getTaskByID(id)
            dispatch(taskOneSuccess(res))
            navigate('/home/edit_task')
        } catch(e) {
            dispatch(taskOneFail(e.message))
        }
    }

    // Page Count
    const pageCount = Math.ceil(taskInfo.length / tasksPerPage)

    const displayTasks = taskInfo.slice(pagesVisited, pagesVisited + tasksPerPage)
        .map((task) => {
            return (
                <div key={task.id} className="flex flex-col border-2 rounded-md border-myrose-500 bg-myrose-200 p-4 mx-4">
                    <div className="font-bold">
                        📝 {task.title}
                    </div>
                    <div className="text-sm">
                        📅 Date: {task.created}
                    </div>
                    <div className="ml-6 py-2">
                        {task.description}
                    </div>
                    <div className="flex space-x-3 justify-end">
                        <button onClick={() => editTaskHandle(task.id)} className="font-bold text-md rounded bg-sky-500 px-2 hover:scale-125 transition-transform duration-300">
                            ✏️
                        </button>
                        {isLoading?
                            <button disabled className="font-bold text-md rounded bg-red-300 px-2">
                                ❌
                            </button>:
                            <button onClick={() => deleteTaskHandle(task.id)} className="font-bold text-md rounded bg-red-500 px-2 hover:scale-125 transition-transform duration-300">
                                ❌
                            </button>
                        }
                    </div>
                </div>
            )
        })

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <div className="my-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col space-y-6">
                    {displayTasks}
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"flex space-x-4 justify-center"}
                        previousLinkClassName={"bg-myrose-300 p-1 hover:bg-myrose-200"}
                        nextLinkClassName={"bg-myrose-300 p-1 hover:scale-110 transition-transform duration-300 hover:bg-myrose-200"}
                        activeClassName={"bg-myrose-200 px-1 hover:scale-110 transition-transform duration-300"}
                    />
                </div>
            </div>
        </div>
    )
}
