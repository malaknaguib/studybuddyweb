import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function TaskTracker() {
  const [tasks, setTasks] = useLocalStorage('studybuddy-tasks', [])
  const [input, setInput] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setTasks(prev => [...prev, { id: Date.now(), text, done: false }])
    setInput('')
  }

  const toggle = (id) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))

  const remove = (id) =>
    setTasks(prev => prev.filter(t => t.id !== id))

  const clearDone = () =>
    setTasks(prev => prev.filter(t => !t.done))

  const pending = tasks.filter(t => !t.done).length
  const done = tasks.filter(t => t.done).length

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Tasks</h2>
        <div className="flex gap-3 text-sm text-gray-400">
          <span><span className="text-violet-400 font-medium">{pending}</span> pending</span>
          <span><span className="text-emerald-400 font-medium">{done}</span> done</span>
        </div>
      </div>

      <form onSubmit={addTask} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
        >
          Add
        </button>
      </form>

      <ul className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        {tasks.length === 0 && (
          <li className="text-center text-gray-500 text-sm py-4">No tasks yet. Add one above!</li>
        )}
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group"
          >
            <button
              onClick={() => toggle(task.id)}
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${
                task.done
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-gray-500 hover:border-violet-400'
              }`}
            >
              {task.done && (
                <svg viewBox="0 0 20 20" fill="white" className="w-full h-full p-0.5">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <span className={`flex-1 text-sm ${task.done ? 'line-through text-gray-500' : 'text-gray-200'}`}>
              {task.text}
            </span>
            <button
              onClick={() => remove(task.id)}
              className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 text-lg leading-none"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {done > 0 && (
        <button
          onClick={clearDone}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors self-end"
        >
          Clear completed
        </button>
      )}
    </div>
  )
}
