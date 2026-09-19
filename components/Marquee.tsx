'use client'
import { useState } from 'react'

interface MarqueeProps {
  text: string
  initialEnabled?: boolean
}

export default function Marquee({ text, initialEnabled = true }: MarqueeProps) {
  const [enabled, setEnabled] = useState(initialEnabled)

  if (!enabled) return null

  return (
    <div className="bg-amber-100 text-amber-900 border-b border-amber-300 px-4 py-2 flex items-center justify-between text-sm">
      <div className="overflow-hidden whitespace-nowrap w-full mr-4">
        <div className="inline-block animate-marquee">{text}</div>
      </div>
      <button
        onClick={() => setEnabled(false)}
        className="text-xs bg-amber-200 hover:bg-amber-300 text-amber-800 px-2 py-1 rounded shrink-0"
      >
        關閉
      </button>
    </div>
  )
}
