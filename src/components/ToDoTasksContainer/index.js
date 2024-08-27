import { useContext } from 'react'
import ToDoContainer from '../ToDocontainer/index'
import TaskContext from '../../context/TaskContext'
import './index.css'

const ToDoTasksContainer = () => {
    const {tasksData} = useContext(TaskContext)
    const toDoData = tasksData.filter(task => task.status==="To Do")
    return (
    <div className='todo-container'>
        <div className='todo-header'>
            <span className='dot'></span>
            <h1 className='todo-heading'>To Do</h1>
            <span className='task-count-container'>
                <p className='task-count'>{toDoData.length}</p>
            </span>
        </div>
        <hr />
        <ul className='to-do-list'>
            {
                toDoData.map(data => <ToDoContainer key={data.id} details={data} />)
            }
        </ul>
    </div>
)
}
export default ToDoTasksContainer