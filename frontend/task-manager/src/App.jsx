import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import * as api from './lib/api'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const pollingRef = useRef(null)

  const fetchTasks = async () => {
    try {
      const data = await api.getTasks()
      setTasks(data || [])
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // initial fetch
    fetchTasks()

    // polling every 3s for near-realtime updates
    pollingRef.current = setInterval(fetchTasks, 3000)

    return () => clearInterval(pollingRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Optimistic add
  const addTask = async (task) => {
    const tempId = `temp-${Date.now()}`
    const optimistic = { id: tempId, ...task }
    setTasks((s) => [...s, optimistic])

    try {
      const created = await api.createTask(task)
      setTasks((s) => s.map((t) => (t.id === tempId ? created : t)))
    } catch (err) {
      setTasks((s) => s.filter((t) => t.id !== tempId))
      setError(err.message || 'Failed to create task')
    }
  }

  // Optimistic delete
  const deleteTask = async (id) => {
    const prev = tasks
    setTasks((s) => s.filter((t) => t.id !== id))

    try {
      await api.deleteTask(id)
    } catch (err) {
      setTasks(prev)
      setError(err.message || 'Failed to delete task')
    }
  }

  // Toggle reminder (optimistic)
  const toggleReminder = async (id) => {
    const prev = tasks
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, reminder: !t.reminder } : t)))

    try {
      const toUpdate = tasks.find((t) => t.id === id)
      if (!toUpdate) return
      await api.updateTask(id, { ...toUpdate, reminder: !toUpdate.reminder })
    } catch (err) {
      setTasks(prev)
      setError(err.message || 'Failed to update task')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Task Tracker"
        onAdd={() => setShowAddTask((s) => !s)}
        showAdd={showAddTask}
      />
      <main className="mx-auto max-w-5xl px-6 py-8">
        {loading && <p className="text-sm text-gray-500">Loading tasks...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {showAddTask && <AddTask onAdd={addTask} />}
        <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      </main>
    </div>
  )
}

export default App
