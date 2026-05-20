import { useState } from 'react'
import { getRandomQuote } from '../data/quotes'

export default function QuoteCard() {
  const [quote, setQuote] = useState(() => getRandomQuote())

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span className="text-violet-400 text-4xl leading-none font-serif mt-1">"</span>
        <p className="text-gray-200 text-sm leading-relaxed italic flex-1">{quote.text}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">— {quote.author}</span>
        <button
          onClick={() => setQuote(getRandomQuote())}
          className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
        >
          New quote →
        </button>
      </div>
    </div>
  )
}
