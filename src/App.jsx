import PomodoroTimer from './components/PomodoroTimer'
import TaskTracker from './components/TaskTracker'
import QuoteCard from './components/QuoteCard'
import './index.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.15), transparent)',
        }}
      />

      <div className="relative max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            StudyBuddy
          </h1>
          <p className="text-gray-400 text-sm mt-1">Stay focused. Get things done.</p>
        </header>

        <QuoteCard />
        <PomodoroTimer />
        <TaskTracker />

        <footer className="text-center text-xs text-gray-600">
          Built for students · All data saved locally
        </footer>
      </div>
    </div>
  )
}
