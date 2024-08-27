import { useContext } from 'react'
import ToDoContainer from '../ToDocontainer/index'
import TaskContext from '../../context/TaskContext'
import './index.css'


const ToDoTasksContainer = () => {
    const {tasksData} = useContext(TaskContext)
    const completedData = tasksData.filter(task => task.status==="Completed")
    return (
    <div className='todo-container'>
        <div className='todo-header'>
            <span className='done-tasks-dot'></span>
            <h1 className='todo-heading'>Done</h1>
            <span className='task-count-container'>
                <p className='task-count'>{completedData.length}</p>
            </span>
        </div>
        <hr className='done-tasks-line'/>
        <ul className='to-do-list'>
            {
                completedData.map(data => <ToDoContainer key={data.id} details={data} />)
            }
        </ul>
    </div>
)
}
export default ToDoTasksContainer