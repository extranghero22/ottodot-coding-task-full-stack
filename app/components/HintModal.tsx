'use client'

import { useState } from 'react'

interface HintModalProps {
  isOpen: boolean
  onClose: () => void
  hint: string | null
  onHintUsed: () => void
  disabled?: boolean
}

export default function HintModal({
  isOpen,
  onClose,
  hint,
  onHintUsed,
  disabled = false
}: HintModalProps) {
  const [hintRevealed, setHintRevealed] = useState(false)

  if (!isOpen || !hint) return null

  const handleShowHint = () => {
    setHintRevealed(true)
    onHintUsed()
  }

  const handleClose = () => {
    setHintRevealed(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-gray-800 rounded-xl p-6 md:p-8 max-w-lg w-full border border-gray-600 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-transparent border-none text-gray-300 text-2xl cursor-pointer p-2 rounded transition-colors duration-200 hover:text-white"
        >
          ×
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6 pr-8">
          <div className="bg-purple-400 rounded-full w-10 h-10 flex items-center justify-center border border-purple-500">
            <span className="text-xl">💡</span>
          </div>
          <h2 className="text-2xl font-light text-white m-0">
            Hint
          </h2>
        </div>

        {/* Hint Content */}
        <div className="bg-gray-700 rounded-lg p-6 border border-gray-500 mb-6">
          {hintRevealed ? (
            <p className="text-base text-white leading-relaxed m-0">
              {hint}
            </p>
          ) : (
            <div className="flex items-center justify-center gap-2 p-4">
              <span className="text-2xl">🔒</span>
              <p className="text-base text-gray-300 m-0 italic">
                Click "Show Hint" to reveal the hint
              </p>
            </div>
          )}
        </div>

        {/* Warning Message */}
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-500 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">⚠️</span>
            <span className="text-sm text-yellow-400 font-medium">
              Note
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed m-0">
            Using a hint will be recorded in your statistics. Take your time to think about the problem first!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-3 rounded-md border border-gray-500 bg-transparent text-gray-300 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-gray-700 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleShowHint}
            disabled={disabled}
            className={`px-6 py-3 rounded-md border-none text-sm font-medium transition-all duration-200 ${
              disabled 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-purple-400 text-white cursor-pointer hover:bg-purple-500'
            }`}
          >
            Show Hint
          </button>
        </div>
      </div>
    </div>
  )
}