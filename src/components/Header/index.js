import { useContext } from "react"
import { CiSearch,CiFilter } from "react-icons/ci"
import TaskContext from "../../context/TaskContext"
import './index.css'

const filterOptions = [
    {
        id: 1,
        displayText: 'To Do',
        filterValue: 'ToDo'
    },
    {
        id: 2,
        displayText: 'On Progress',
        filterValue: 'OnProgress'
    },
    {
        id: 3,
        displayText: 'Done',
        filterValue: 'Done'
    }
]

const Header = () => {
    const {search,onChangeSearch} = useContext(TaskContext)
    const onChangingSearch = event => onChangeSearch(event.target.value)
    return (
    <div className='header-container'>
        <div className='search-box-container'>
        <CiSearch className='react-icon'/>
        <input type="search" className='search-input-field' value={search} onChange={onChangingSearch} placeholder='Search Project' />
        </div>
        <div className='filter-box-container'>
        <CiFilter className='react-icon'/>
        <div className="filter-container">
            <label htmlFor="filter" className="filter-label">Filter</label>
            <select id='filter' placeholder='Filter' className="filter-input-filed">
            <option hidden disabled selected value></option>
                {
                    filterOptions.map(filter => <option key={filter.id} value={filter.filterValue}>{filter.displayText}</option>)
                }
            </select>
        </div>
        </div>
    </div>
)
}
export default Header