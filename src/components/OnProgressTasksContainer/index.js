import { useContext } from 'react'
import ToDoContainer from '../ToDocontainer/index'
import TaskContext from '../../context/TaskContext'
import './index.css'


const ToDoTasksContainer = () => {
    const {tasksData} = useContext(TaskContext)
    const onProgressData = tasksData.filter(task => task.status==="On Progress")
    return (
    <div className='todo-container'>
        <div className='todo-header'>
            <span className='on-progress-dot'></span>
            <h1 className='todo-heading'>On Progress</h1>
            <span className='task-count-container'>
                <p className='task-count'>{onProgressData.length}</p>
            </span>
        </div>
        <hr className='on-progress-line'/>
        <ul className='to-do-list'>
            {
                onProgressData.map(data => <ToDoContainer key={data.id} details={data} />)
            }
        </ul>
    </div>
)
}
export default ToDoTasksContainer