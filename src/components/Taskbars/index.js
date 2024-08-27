import { FcExpired } from "react-icons/fc"
import { VscFolderActive } from "react-icons/vsc"
import { IoTimeOutline } from "react-icons/io5"
import './index.css'

const TaskBars = (props) => {
    const {title,tasksCompleted} = props
    let reactIcon
    if(title==="Expired Tasks"){
        reactIcon = (<div className="expired-icon"><FcExpired size={30}/></div>)
    } else if(title==="All Active Tasks"){
        reactIcon = (<div className="active-tasks-icon"><VscFolderActive size={30}/></div>)
    } else if(title==="Completed Tasks"){
        reactIcon = (<div className="completed-tasks-icon"><IoTimeOutline size={30}/></div>)
    }
    return (
        <div className='task-bar-container'>
            <div className="task-details-container">
                {reactIcon}
                <div className="task-details">
                <p className="task-title">{title}</p>
                <p className="tasks-completed">{tasksCompleted}</p>
                </div>
            </div>
        </div>
    )
}
export default TaskBars