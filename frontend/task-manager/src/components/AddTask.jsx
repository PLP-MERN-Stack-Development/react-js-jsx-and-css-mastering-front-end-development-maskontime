import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add a task')
      return
    }

    onAdd({ text, day, reminder })

    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Task</h2>
      
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Task
          </label>
          <input
            type="text"
            placeholder="Add Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Day & Time
          </label>
          <input
            type="text"
            placeholder="Add Day & Time"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="reminder"
            checked={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="reminder" className="text-sm font-medium text-gray-700 cursor-pointer">
            Set Reminder
          </label>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Task
        </button>
      </form>
    </div>
  )
}

export default AddTask
