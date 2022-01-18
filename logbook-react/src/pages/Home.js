import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

// API
import { getTasks, getTaskByID, deleteTask } from '../api/TaskAPI'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { taskLoading, taskSuccess, taskFail } from '../features/taskSlice'
import { taskOneLoading, taskOneSuccess, taskOneFail } from '../features/taskOneSlice'

// Components
import { Task } from '../components/Task'

export const Home = () => {

    // Pagination
    const [pageNumber, setPageNumber] = useState(0)
    const tasksPerPage = 5
    const pagesVisited = pageNumber * tasksPerPage

    // Navigate
    const navigate = useNavigate()

    // Store
    const dispatch = useDispatch()
    const [user, { taskInfo, isLoading }, { taskOneInfo }, { keyword }] = useSelector((state) => [
        state.user,
        state.task,
        state.taskOne,
        state.search
    ])

    if(!user.userInfo) {
        navigate('/')
    }

    useEffect(() => {
        async function fetchTasks(search) {
            try {
                const res = await getTasks(search)
                dispatch(taskSuccess(res.sort((a, b) =>  new Date(b.created) - new Date(a.created))))
            } catch(e) {
                dispatch(taskFail(e.message))
            }
        }

        dispatch(taskLoading())
        fetchTasks(keyword)
    }, [taskOneInfo, keyword])

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
                <Task task={task} isLoading={isLoading} editTaskHandle={editTaskHandle} deleteTaskHandle={deleteTaskHandle}/>
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
                    {isLoading? 
                        null:
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"flex space-x-4 justify-center item"}
                            previousLinkClassName={"bg-amber-500 p-1 hover:bg-amber-700"}
                            nextLinkClassName={"bg-amber-500 p-1 hover:bg-amber-700"}
                            activeClassName={"bg-amber-300 px-1 hover:scale-110 transition-transform duration-300"}
                        />
                    }
                </div>
            </div>
        </div>
    )
}
