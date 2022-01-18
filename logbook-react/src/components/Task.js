import React from 'react'

export const Task = ({ task, isLoading, editTaskHandle, deleteTaskHandle }) => {
    return (
        <div key={task.id} className="flex flex-col shadow-md bg-white p-4 mx-4">
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
                <button onClick={() => editTaskHandle(task.id)} className="font-bold text-md rounded bg-amber-300 px-2 hover:scale-125 transition-transform duration-300">
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
}
