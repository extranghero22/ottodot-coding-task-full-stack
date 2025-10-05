'use client'

interface MetricsModalProps {
  isOpen: boolean
  onClose: () => void
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  hintsUsed: number
}

export default function MetricsModal({
  isOpen,
  onClose,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  hintsUsed,
}: MetricsModalProps) {
  if (!isOpen) return null

  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-gray-800 rounded-xl p-6 md:p-8 max-w-lg w-full border border-gray-600 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none text-gray-300 text-2xl cursor-pointer p-2 rounded transition-colors duration-200 hover:text-white"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-light mb-6 text-white pr-8">
          Your Progress
        </h2>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Total Questions */}
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-500 text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {totalQuestions}
            </div>
            <div className="text-sm text-gray-300 font-medium">
              Questions
            </div>
          </div>

          {/* Correct Answers */}
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-500 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {correctAnswers}
            </div>
            <div className="text-sm text-gray-300 font-medium">
              Correct
            </div>
          </div>

          {/* Accuracy */}
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-500 text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {accuracy}%
            </div>
            <div className="text-sm text-gray-300 font-medium">
              Accuracy
            </div>
          </div>

          {/* Hints Used */}
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-500 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {hintsUsed}
            </div>
            <div className="text-sm text-gray-300 font-medium">
              Hints Used
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {totalQuestions > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300 font-medium">
                Overall Progress
              </span>
              <span className="text-sm text-white font-semibold">
                {accuracy}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden border border-gray-500">
              <div 
                className="h-full bg-green-400 transition-all duration-300 ease-out"
                style={{ width: `${accuracy}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-md border-none bg-white text-black text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}