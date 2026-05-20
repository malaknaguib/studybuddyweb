import { useState, useEffect, useCallback, useRef } from 'react'

const MODES = {
  work: { label: 'Focus', duration: 25 * 60, color: 'text-violet-400' },
  break: { label: 'Break', duration: 5 * 60, color: 'text-emerald-400' },
}

export default function PomodoroTimer() {
  const [mode, setMode] = useState('work')
  const [timeLeft, setTimeLeft] = useState(MODES.work.duration)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef(null)

  const reset = useCallback((nextMode = mode) => {
    clearInterval(intervalRef.current)
    setRunning(false)
    setMode(nextMode)
    setTimeLeft(MODES[nextMode].duration)
  }, [mode])

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          if (mode === 'work') {
            setSessions(s => s + 1)
            setMode('break')
            setTimeLeft(MODES.break.duration)
          } else {
            setMode('work')
            setTimeLeft(MODES.work.duration)
          }
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, mode])

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')
  const progress = 1 - timeLeft / MODES[mode].duration
  const circumference = 2 * Math.PI * 54

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {Object.entries(MODES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => reset(key)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
              mode === key
                ? 'bg-violet-500/30 text-violet-300 border border-violet-500/50'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke={mode === 'work' ? '#8b5cf6' : '#10b981'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-mono font-bold ${MODES[mode].color}`}>
            {minutes}:{seconds}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setRunning(r => !r)}
          className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => reset(mode)}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      <p className="text-sm text-gray-400">
        Sessions completed: <span className="text-violet-400 font-semibold">{sessions}</span>
      </p>
    </div>
  )
}
