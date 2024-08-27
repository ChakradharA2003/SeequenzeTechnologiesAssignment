import { useState,useContext } from "react"
import Popup from 'reactjs-popup'
import {v4 as uuidv4} from 'uuid'
import { SlOptions } from "react-icons/sl"
import { FaCheckSquare } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"
import TaskContext from "../../context/TaskContext"
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

const ToDoContainer = props => {
    const {details} = props
    const {id,title,difficulty,status,description,deadLine} = details 
    let previousId = id
    let toDoDifficulty,optionsIcon
    if(status==="Completed"){
        toDoDifficulty = (<div className="completed-task"><font className="completed">{status}</font></div>)
        optionsIcon = (<SlOptions color="#8976E4"/>)
    }
    else{
        if(difficulty==="Low"){
            toDoDifficulty = (<div className="low-difficulty"><font className="low-diff">{difficulty}</font></div>)
        } 
        if(difficulty==="High"){
            toDoDifficulty = (<div className="high-difficulty"><font className="high-diff">{difficulty}</font></div>)
        }
        optionsIcon = (<SlOptions color="#ffffff"/>)
    }
    const {updateTask,deleteTask} = useContext(TaskContext)
    const [isOptions,onToggleOptions] = useState(false)
    const onClickedToggleOptions = () => onToggleOptions(prevState => !prevState)
    const [taskTitle,changeTitle] = useState(title)
    const [taskDescription,changeDescription] = useState(description)
    const [taskLevel,changeLevel] = useState(difficulty)
    const [taskStatus,changeStatus] = useState(status)
    const [taskDeadline,changeDeadline] = useState(deadLine)
    const onChangeTitle = event => changeTitle(event.target.value)
    const onChangeDescription = event => changeDescription(event.target.value)
    const onChangeLevel = event => changeLevel(event.target.value)
    const onChangeStatus = event => changeStatus(event.target.value)
    const onChangeDeadline = event => changeDeadline(event.target.value)
    const onEditTask = event => {
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
        updateTask(previousId,newTask)
        changeTitle('')
        changeDeadline('')
        changeDescription('')
        changeLevel('')
        changeStatus('')
    }
    const onClickedDelete = () => {
        deleteTask(previousId)
    }
    return (
        <li className='todo-list'>
            <div className="todo-sub-container">
            <div className='difficulty-options-container'>
                {toDoDifficulty}
                <div className="dropdown">
                <button type="button" onClick={onClickedToggleOptions} className="options-button">{optionsIcon}</button>
                {isOptions && <div className="drop-down-options">
                    <Popup modal trigger={<button type="button" onClick={onClickedToggleOptions} className="dropdown-btn">Edit</button>}>
                    {
                    close => {
                        return (
                        <form onSubmit={onEditTask} className="add-task-popup-container">
                            <div className="popup-header-add-btn-container">
                                <div className="popup-dot-heading">
                                    <span className="popup-dot"></span>
                                    <h1 className="popup-heading">EDIT TASK</h1>
                                </div>
                                <Popup modal trigger={<button type="submit" onClick={onEditTask} className="add-icon-button"><IoMdAdd color="#20E7F4"/></button>}>
                                {
                                    <div className="task-added-popup-container">
                                        <div className="tick-container"><FaCheckSquare size={50}/></div>
                                        <p className="task-added-description">Your task has been Edited successfully</p>
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
                    
                    <Popup modal trigger={<button type="button" onClick={onClickedToggleOptions} className="dropdown-delete-btn">Delete</button>}>
                    {
                        close => (
                            <div className="delete-popup-container">
                                <div className="delete-popup-btns">
                                <button type="button" className="delete-popup-close-btn" onClick={()=> close()}>Cancel</button>
                                <button type="button" className="delete-popup-delete-btn" onClick={onClickedDelete}>Delete</button>
                                </div>
                            </div>
                        )
                    }
                    </Popup>
                </div>}
                </div>
            </div>
            <div className="todo-list-details">
                <h1 className="title">{title}</h1>
                <p className="description">{description}</p>
            </div>
            </div>
            <p className="deadline">Deadline: <span className="date">{deadLine}</span></p>
        </li>
    )
}
export default ToDoContainer