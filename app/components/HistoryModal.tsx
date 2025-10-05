'use client'

import { useEffect, useState } from 'react'

interface HistoryItem {
  session_id: string
  created_at: string
  problem_text: string
  difficulty: string
  topic: string | null
  is_correct: boolean | null
  hint_used: boolean
  user_answer?: number
  correct_answer?: number
  options?: Array<{text: string, value: number}>
}

interface HistoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'difficulty' | 'result'>('date')
  const [filterBy, setFilterBy] = useState<'all' | 'correct' | 'incorrect' | 'hint'>('all')
  const [selectedProblem, setSelectedProblem] = useState<HistoryItem | null>(null)

  useEffect(() => {
    if (isOpen) {
      fetchHistory()
    }
  }, [isOpen])

  const fetchHistory = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Get user_id from localStorage
      const userId = localStorage.getItem('math_app_user_id')

      // Build URL with user_id query parameter
      const url = userId
        ? `/api/problem-history?user_id=${encodeURIComponent(userId)}`
        : '/api/problem-history'

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch history')
      }

      const data = await response.json()
      setHistory(data.history || [])
    } catch (err) {
      console.error('Error fetching history:', err)
      setError('Failed to load problem history')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAndSortedHistory = history
    .filter(item => {
      if (filterBy === 'correct') return item.is_correct === true
      if (filterBy === 'incorrect') return item.is_correct === false
      if (filterBy === 'hint') return item.hint_used === true
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      if (sortBy === 'difficulty') {
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 }
        return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
      }
      if (sortBy === 'result') {
        if (a.is_correct === b.is_correct) return 0
        if (a.is_correct === true) return -1
        if (b.is_correct === true) return 1
        return 0
      }
      return 0
    })

  const stats = {
    total: history.length,
    correct: history.filter(item => item.is_correct === true).length,
    incorrect: history.filter(item => item.is_correct === false).length,
    hintsUsed: history.filter(item => item.hint_used === true).length
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-gray-800 rounded-xl max-w-sm md:max-w-2xl lg:max-w-4xl w-full max-h-screen border border-gray-600 flex flex-col relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none text-gray-300 text-2xl cursor-pointer p-2 rounded transition-colors duration-200 hover:text-white z-10"
        >
          ×
        </button>

        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-600">
          <h2 className="text-xl md:text-2xl font-light text-white mb-4 pr-8">
            Problem History
          </h2>
          
          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="bg-gray-700 rounded-lg p-3 text-center border border-gray-500">
              <div className="text-lg font-bold text-white">{stats.total}</div>
              <div className="text-xs text-gray-300">Total</div>
            </div>
            <div className="bg-green-600 rounded-lg p-3 text-center border border-green-500">
              <div className="text-lg font-bold text-white">{stats.correct}</div>
              <div className="text-xs text-green-100">Correct</div>
            </div>
            <div className="bg-red-600 rounded-lg p-3 text-center border border-red-500">
              <div className="text-lg font-bold text-white">{stats.incorrect}</div>
              <div className="text-xs text-red-100">Incorrect</div>
            </div>
            <div className="bg-yellow-600 rounded-lg p-3 text-center border border-yellow-500">
              <div className="text-lg font-bold text-white">{stats.hintsUsed}</div>
              <div className="text-xs text-yellow-100">Hints Used</div>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Filter by:</label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="w-full px-3 py-2 rounded-md border border-gray-500 bg-gray-700 text-white text-sm"
              >
                <option value="all">All Problems</option>
                <option value="correct">Correct Only</option>
                <option value="incorrect">Incorrect Only</option>
                <option value="hint">With Hints</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 rounded-md border border-gray-500 bg-gray-700 text-white text-sm"
              >
                <option value="date">Date (Newest)</option>
                <option value="difficulty">Difficulty</option>
                <option value="result">Result</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-300">Loading history...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-400 mb-2">⚠️</div>
              <p className="text-gray-300">{error}</p>
              <button
                onClick={fetchHistory}
                className="mt-3 px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredAndSortedHistory.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">📚</div>
              <p className="text-gray-300">No problems found</p>
              <p className="text-sm text-gray-400 mt-1">
                {filterBy === 'all' ? 'Start solving problems to see your history!' : 'No problems match your current filter.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAndSortedHistory.map((item, index) => (
                <div
                  key={`${item.session_id}-${index}`}
                  onClick={() => setSelectedProblem(item)}
                  className="bg-gray-700 rounded-lg p-4 border border-gray-500 cursor-pointer hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.difficulty === 'easy' ? 'bg-green-600 text-green-100' :
                        item.difficulty === 'medium' ? 'bg-yellow-600 text-yellow-100' :
                        'bg-red-600 text-red-100'
                      }`}>
                        {item.difficulty}
                      </span>
                      {item.topic && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-200 rounded text-xs">
                          {item.topic}
                        </span>
                      )}
                      {item.hint_used && (
                        <span className="px-2 py-1 bg-yellow-600 text-yellow-100 rounded text-xs">
                          💡 Hint Used
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        item.is_correct === true ? 'text-green-400' :
                        item.is_correct === false ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {item.is_correct === true ? '✓ Correct' :
                         item.is_correct === false ? '✗ Incorrect' :
                         '⏸ Not Answered'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-200 line-clamp-2">
                    {item.problem_text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Problem Detail Modal */}
        {selectedProblem && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-60 p-4">
            <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-screen border border-gray-600 overflow-auto">
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Problem Details</h3>
                  <button
                    onClick={() => setSelectedProblem(null)}
                    className="text-gray-300 hover:text-white text-xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-500">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Problem:</h4>
                    <p className="text-white">{selectedProblem.problem_text}</p>
                  </div>
                  
                  {selectedProblem.options && (
                    <div className="bg-gray-700 rounded-lg p-4 border border-gray-500">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Options:</h4>
                      <div className="space-y-2">
                        {selectedProblem.options.map((option, index) => (
                          <div
                            key={index}
                            className={`p-2 rounded text-sm ${
                              selectedProblem.user_answer === option.value
                                ? selectedProblem.is_correct
                                  ? 'bg-green-600 text-green-100'
                                  : 'bg-red-600 text-red-100'
                                : selectedProblem.correct_answer === option.value
                                  ? 'bg-green-600 text-green-100'
                                  : 'bg-gray-600 text-gray-200'
                            }`}
                          >
                            <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option.text}
                            {selectedProblem.user_answer === option.value && (
                              <span className="ml-2 text-xs">(Your Answer)</span>
                            )}
                            {selectedProblem.correct_answer === option.value && (
                              <span className="ml-2 text-xs">(Correct)</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-300">
                      <span className="font-medium">Difficulty:</span> {selectedProblem.difficulty}
                      {selectedProblem.topic && (
                        <span className="ml-4">
                          <span className="font-medium">Topic:</span> {selectedProblem.topic}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400">
                      {new Date(selectedProblem.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}