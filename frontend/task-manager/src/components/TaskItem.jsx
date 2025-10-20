import { FaTimes } from 'react-icons/fa'

const TaskItem = ({ task, onDelete, onToggle }) => {
    return (
        <div
            onDoubleClick={() => onToggle(task.id)}
            className={`mb-3 p-4 rounded-md shadow-sm bg-white transition-colors duration-150 cursor-pointer ${
                task.reminder ? 'border-l-4 border-green-500' : 'border border-gray-200'
            }`}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">{task.text}</h3>
                <FaTimes
                    onClick={() => onDelete(task.id)}
                    className="text-red-500 hover:text-red-700"
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <p className="text-sm text-gray-500 mt-1">{task.day}</p>
        </div>
    )
}

export default TaskItem
