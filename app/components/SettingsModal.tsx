'use client'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  difficulty: string
  topic: string | null
  timerEnabled: boolean
  onDifficultyChange: (difficulty: string) => void
  onTopicChange: (topic: string | null) => void
  onTimerToggle: (enabled: boolean) => void
}

const topics = [
  { value: null, label: 'All Topics' },
  { value: 'Whole Numbers', label: 'Whole Numbers' },
  { value: 'Fractions', label: 'Fractions' },
  { value: 'Decimals', label: 'Decimals' },
  { value: 'Percentage', label: 'Percentage' },
  { value: 'Rate', label: 'Rate' },
  { value: 'Area', label: 'Area' },
  { value: 'Volume', label: 'Volume' },
  { value: 'Angles', label: 'Angles' },
  { value: 'Triangles', label: 'Triangles' },
  { value: 'Quadrilaterals', label: 'Quadrilaterals' },
]

export default function SettingsModal({
  isOpen,
  onClose,
  difficulty,
  topic,
  timerEnabled,
  onDifficultyChange,
  onTopicChange,
  onTimerToggle,
}: SettingsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-gray-800 rounded-xl p-4 md:p-8 max-w-sm md:max-w-lg w-full max-h-screen border border-gray-600 relative overflow-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none text-gray-300 text-2xl cursor-pointer p-2 rounded transition-colors duration-200 hover:text-white"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-light mb-6 text-white pr-8">
          Practice Settings
        </h2>

        {/* Settings Content */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Difficulty Selection */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Difficulty Level
            </label>
            <div className="flex gap-2 flex-wrap">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => onDifficultyChange(level)}
                  className={`flex-1 min-w-20 px-3 py-2 md:px-4 md:py-3 rounded-md font-medium text-sm cursor-pointer transition-all duration-200 ${
                    difficulty === level 
                      ? 'bg-white text-black border border-white' 
                      : 'bg-gray-700 text-gray-300 border border-gray-500 hover:bg-gray-600'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Selection */}
          <div>
            <label htmlFor="topic-select" className="block text-sm font-medium mb-3 text-gray-300">
              Topic Focus
            </label>
            <select
              id="topic-select"
              value={topic || ''}
              onChange={(e) => onTopicChange(e.target.value || null)}
              className="w-full px-3 py-2 md:px-4 md:py-3 rounded-md border border-gray-500 bg-gray-700 text-white text-sm cursor-pointer"
            >
              {topics.map((t) => (
                <option key={t.label} value={t.value || ''} className="bg-gray-700 text-white">
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Timer Toggle */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Timer
            </label>
            <div className="flex items-center gap-4 p-3 bg-gray-700 rounded-md border border-gray-500">
              <button
                onClick={() => onTimerToggle(!timerEnabled)}
                className={`w-12 h-6 rounded-full border-none cursor-pointer transition-colors duration-200 relative p-0 ${
                  timerEnabled ? 'bg-green-400' : 'bg-gray-500'
                }`}
              >
                <div 
                  className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-200 ${
                    timerEnabled ? 'left-6' : 'left-0.5'
                  }`} 
                />
              </button>
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  timerEnabled ? 'text-white' : 'text-gray-300'
                }`}>
                  {timerEnabled ? 'Enabled' : 'Disabled'}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {timerEnabled
                    ? 'Easy: 30s • Medium: 1m • Hard: 2m'
                    : 'No time limit for questions'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Text */}
        <div className="mt-6 p-3 bg-gray-700 rounded-md border border-gray-500">
          <p className="text-xs text-gray-300 m-0 leading-relaxed">
            <span className="font-medium text-white">Tip:</span> Start with Easy problems to build confidence,
            then progress to Medium and Hard. Choose a topic to focus on specific areas!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-md border border-gray-500 bg-transparent text-gray-300 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-gray-700 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-md border-none bg-white text-black text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-gray-100"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}