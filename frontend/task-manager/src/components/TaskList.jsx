import TaskItem from './TaskItem'

const TaskList = ({ tasks, onDelete, onToggle }) => {
  return (
    <div className="space-y-4">
      {tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-300">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Tasks Yet</h3>
            <p className="text-gray-500">Get started by adding your first task above.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskList