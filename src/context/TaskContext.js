import React from 'react'

const TaskContext = React.createContext({
    tasksData: [],
    addNewTask: () => {},
    updateTask: () => {},
    deleteTask: () => {},
    search: '',
    filter: ''
})
export default TaskContext