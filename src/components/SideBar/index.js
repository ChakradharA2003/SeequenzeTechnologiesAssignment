import { useContext,useState,useEffect } from 'react'
import Popup from 'reactjs-popup'
import {v4 as uuidv4} from 'uuid'
import { IoMdAdd } from "react-icons/io"
import { FaCheckSquare } from "react-icons/fa"
import TaskContext from '../../context/TaskContext'
import TaskBars from '../Taskbars/index'

import './index.css'

const difficultyConstants = [
    {
        id: 1,
        displayText: 'Low',
    },
    {
        id: 2,
        displayText: 'High'
    }
]

const statusConstants = [
    {
        id: 1,
        displayText: 'To Do'
    },
    {
        id: 2,
        displayText: 'On Progress'
    },
    {
        id: 3,
        displayText: 'Completed'
    }
]

const SideBar = () => {
    const {tasksData,addNewTask} = useContext(TaskContext)
    const CompletedTasks = tasksData.filter(task => task.status==="Completed")
    const [taskTitle,changeTitle] = useState('')
    const [taskDescription,changeDescription] = useState('')
    const [taskLevel,changeLevel] = useState(difficultyConstants[0].displayText)
    const [taskStatus,changeStatus] = useState(statusConstants[0].displayText)
    const [taskDeadline,changeDeadline] = useState('')
    const onChangeTitle = event => changeTitle(event.target.value)
    const onChangeDescription = event => changeDescription(event.target.value)
    const onChangeLevel = event => changeLevel(event.target.value)
    const onChangeStatus = event => changeStatus(event.target.value)
    const onChangeDeadline = event => changeDeadline(event.target.value)
    const onSubmitTask = event => {
        event.preventDefault()
        let deadline = taskDeadline.split("-")
        let year = (deadline[0].slice(deadline[0].length-2,deadline[0].length))
        const newTask = {
            id: uuidv4(),
            title: taskTitle,
            description: taskDescription,
            status: taskStatus,
            difficulty: taskLevel,
            deadLine: `${deadline[2]}/${deadline[1]}/${year}`
        }
        addNewTask(newTask)
        changeTitle('')
        changeDeadline('')
        changeDescription('')
        changeLevel('')
        changeStatus('')
    }
    useEffect(()=>{},[])
    return (
    <div className='side-bar-container'>
        <TaskBars key="1" title="Expired Tasks" tasksCompleted={Math.floor((Math.random() * 10) + 1)} />
        <TaskBars key="2" title="All Active Tasks" tasksCompleted={tasksData.length} />
        <TaskBars key="3" title="Completed Tasks" tasksCompleted={`${CompletedTasks.length} / ${tasksData.length}`} />
        <Popup modal trigger={<button type="button" className='add-task-btn'>+ Add Task</button>}>
        {
            close => {
                return (
                <form onSubmit={onSubmitTask} className="add-task-popup-container">
                    <div className="popup-header-add-btn-container">
                        <div className="popup-dot-heading">
                            <span className="popup-dot"></span>
                            <h1 className="popup-heading">ADD TASK</h1>
                        </div>
                        <Popup modal trigger={<button type="submit" onClick={onSubmitTask} className="add-icon-button"><IoMdAdd color="#20E7F4"/></button>}>
                        {
                            <div className="task-added-popup-container">
                                <div className="tick-container"><FaCheckSquare size={50}/></div>
                                <p className="task-added-description">new task has been craeted successfully</p>
                                <button type="button" className="back-btn" onClick={()=> close()}>Back</button>
                            </div>
                        }
                        </Popup>
                    </div>
                    <hr className="popup-line" />
                    <div className="popup-task-details">
                        <input type="text" className="input-fields" placeholder="Task Title" value={taskTitle} onChange={onChangeTitle}/>
                        <hr className="popup-line2" />
                        <textarea className="input-fields" rows="8" cols="50" placeholder="Task Description" value={taskDescription} onChange={onChangeDescription}></textarea> 
                        <hr className="popup-line2" />
                        <div>
                            <label htmlFor="level" className="input-label">Select Task Level</label>
                            <select id="level" className="select-input-fields" placeholder="Select Level" value={taskLevel} onChange={onChangeLevel}>
                            {
                                difficultyConstants.map(level => <option key={level.id} value={level.displayText}>{level.displayText}</option>)
                            }
                        </select>
                        </div>
                        <hr className="popup-line2" />
                        <div>
                            <label htmlFor="status" className="input-label">Select Task Status</label>
                            <select id="status" className="select-input-fields" value={taskStatus} onChange={onChangeStatus}>
                            {
                                statusConstants.map(level => <option key={level.id} value={level.displayText}>{level.displayText}</option>)
                            }
                        </select>
                        </div>
                        <hr className="popup-line2" />
                        <div>
                            <label htmlFor="deadline" className="input-label">Select Deadline</label>
                            <input type="date" className="date-input-field" value={taskDeadline} onChange={onChangeDeadline} />
                        </div>
                    </div>
                    <button type="button" className="close-btn" onClick={()=> close()}>close</button>

                </form>
            )}
        }
        </Popup>
    </div>
)
}
export default SideBar