import {useEffect, useState} from 'react'
import Header from './components/Header/index'
import SideBar from './components/SideBar/index'
import ToDoTasksContainer from './components/ToDoTasksContainer'
import OnProgressTasksContainer from './components/OnProgressTasksContainer/index'
import DoneTasksContainer from './components/DoneTasksContainer/index'
import SampleData from './components/SampleData/index'
import TaskContext from './context/TaskContext'

import './App.css'

const App = () => {
  const [tasksData,updateTasksData] = useState(SampleData)
  const addNewTask = newTask => updateTasksData(prevState => [...prevState,newTask])
  const updateTask = (id,task) => {
    const updatedTasks = tasksData.filter(task => task.id!== id)
    updateTasksData(updatedTasks)
    updateTasksData(prevState => [...prevState,task])
  }
  const deleteTask = id => {
    const updatedTasks = tasksData.filter(task => task.id !== id)
    updateTasksData(updatedTasks)
  }
  const [search,changeSearch] = useState('')
  const onChangeSearch = value => {
    changeSearch(value)
  }
  
  return (
    <TaskContext.Provider value={{
      tasksData: tasksData,
      addNewTask: addNewTask,
      updateTask: updateTask,
      deleteTask: deleteTask,
      onChangeSearch: onChangeSearch,
      search: search
    }}>
      
      <div className='main-container'>
        <Header />
        <div className='sub-container'>
          <div className="side-bar-container">
          <SideBar />
          </div>
          <div className='todo-containers'>
              <ToDoTasksContainer />
              <OnProgressTasksContainer />
              <DoneTasksContainer />
          </div>
        </div>
      </div>

    </TaskContext.Provider>
  )
}
export default App