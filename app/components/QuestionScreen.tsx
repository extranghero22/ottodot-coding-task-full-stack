import AnswerButton from './AnswerButton'

interface QuestionScreenProps {
  questionNumber: number
  answerCount: number
  problemText: string
  options: Array<{ text: string; value: number }>
  onAnswer: (value: number) => void
  isLoading: boolean
  // Result overlay props
  showResult?: boolean
  isCorrect?: boolean
  feedback?: string
  onNext?: () => void
  // Enhanced answer props
  selectedAnswer?: number
  correctAnswer?: number
  // Modal handlers
  onMetricsClick?: () => void
  onHistoryClick?: () => void
  onHintClick?: () => void
  hint?: string | null
  // Timer props
  timeRemaining?: number
  totalTime?: number
  timerEnabled?: boolean
  // Difficulty and topic props
  difficulty?: string
  topic?: string
}

export default function QuestionScreen({
  questionNumber,
  answerCount,
  problemText,
  options,
  onAnswer,
  isLoading,
  showResult = false,
  isCorrect,
  feedback,
  onNext,
  selectedAnswer,
  correctAnswer,
  onMetricsClick,
  onHistoryClick,
  onHintClick,
  hint,
  timeRemaining = 60,
  totalTime = 60,
  timerEnabled = false,
  difficulty,
  topic
}: QuestionScreenProps) {
  const answerVariants: ('red' | 'blue' | 'yellow' | 'green')[] = ['red', 'blue', 'yellow', 'green']

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      {/* Top Header - Question Display */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-600">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-gray-600 rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center border border-gray-500">
                <span className="font-black text-white text-sm md:text-base">
                  {questionNumber}
                </span>
              </div>
              <div className="text-gray-300 text-xs md:text-sm font-semibold">
                Question {questionNumber}
              </div>
            </div>
            
            {/* Header Buttons */}
            <div className="flex items-center gap-1 flex-wrap">
              {/* Circular Timer - Only show if enabled */}
              {timerEnabled && (
                <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-700 border-2 border-gray-500 flex items-center justify-center">
                  {/* Timer Circle Background */}
                  <svg
                    className="absolute top-0.5 left-0.5 w-7 h-7 md:w-9 md:h-9 -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#555555"
                      strokeWidth="2"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke={timeRemaining <= 10 ? '#ef4444' : timeRemaining <= 30 ? '#fbbf24' : '#22c55e'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 16}`}
                      strokeDashoffset={`${2 * Math.PI * 16 * (1 - timeRemaining / totalTime)}`}
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  {/* Timer Text */}
                  <span className="text-xs font-semibold text-white z-10">
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}

              {/* Metrics Button */}
              <button
                onClick={onMetricsClick}
                className="bg-gray-800 text-gray-300 border border-gray-600 px-2 py-1 text-xs font-medium rounded-md cursor-pointer transition-all duration-200 flex items-center gap-1 hover:bg-gray-700 hover:text-white hover:border-gray-500"
              >
                📊 Metrics
              </button>

              {/* History Button */}
              <button
                onClick={onHistoryClick}
                className="bg-gray-800 text-gray-300 border border-gray-600 px-2 py-1 text-xs font-medium rounded-md cursor-pointer transition-all duration-200 flex items-center gap-1 hover:bg-gray-700 hover:text-white hover:border-gray-500"
              >
                📚 History
              </button>

              {/* Hint Button - Only show if hint is available */}
              {hint && (
                <button
                  onClick={onHintClick}
                  className="bg-gray-800 text-gray-300 border border-gray-600 px-2 py-1 text-xs font-medium rounded-md cursor-pointer transition-all duration-200 flex items-center gap-1 hover:bg-gray-700 hover:text-white hover:border-gray-500"
                >
                  💡 Hint
                </button>
              )}

              {/* Answer Count Badge */}
              <div className="bg-gray-700 rounded-full px-2 py-1 border border-gray-500">
                <span className="text-white font-bold text-xs">
                  {answerCount} {answerCount === 1 ? 'Answer' : 'Answers'}
                </span>
              </div>

              {/* Difficulty and Topic Badges */}
              {difficulty && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  difficulty === 'easy'
                    ? 'bg-green-600 text-green-100'
                    : difficulty === 'medium'
                    ? 'bg-yellow-600 text-yellow-100'
                    : 'bg-red-600 text-red-100'
                }`}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </span>
              )}
              {topic && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-blue-100">
                  {topic}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-3 bg-black min-h-0">
        {isLoading && !showResult ? (
          /* Loading Content - Similar to Result Content */
          <div className="text-center max-w-sm md:max-w-md lg:max-w-lg text-white w-full px-2">
            {/* Loading Spinner */}
            <div className="mb-3">
              <div className="inline-block bg-gray-800 rounded-full p-3 border border-gray-600">
                <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>

            {/* Loading Heading */}
            <h2 className="text-2xl font-light mb-2 leading-tight text-white">
              Generating Question...
            </h2>

            {/* Loading Subheading */}
            <p className="text-sm text-gray-300 mb-3 font-normal">
              Please wait while we prepare your next math problem
            </p>
          </div>
        ) : showResult ? (
          /* Result Content - Compact */
          <div className="text-center max-w-sm md:max-w-md lg:max-w-lg text-white w-full px-2">
            {/* Status Icon */}
            <div className="mb-3">
              <div className="inline-block bg-gray-800 rounded-full p-3 border border-gray-600">
                <span className="text-2xl grayscale brightness-75">
                  {isCorrect ? '✓' : '✗'}
                </span>
              </div>
            </div>

            {/* Result Heading */}
            <h2 className="text-2xl font-light mb-2 leading-tight text-white">
              {isCorrect ? 'Correct!' : 'Not quite!'}
            </h2>

            {/* Subheading */}
            <p className="text-sm text-gray-300 mb-3 font-normal">
              {isCorrect ? 'You got it right!' : 'Keep trying, you can do it!'}
            </p>

            {/* Feedback */}
            <div className="bg-gray-800 rounded-lg p-3 mb-4 border border-gray-600">
              <p className="text-xs text-white leading-relaxed m-0">
                {feedback}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={onNext}
              disabled={isLoading}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2 mx-auto ${
                isLoading 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-800 text-white hover:bg-gray-700 cursor-pointer border border-gray-600'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </>
              ) : (
                <>
                  Next Question
                  <span className="text-sm">→</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Question Content - Expanded to fill space */
          <div className="w-full max-w-sm md:max-w-md lg:max-w-2xl text-center text-white px-2">
            {/* Question Text - Optimized for no scroll */}
            <div className="bg-gray-800 rounded-lg p-3 md:p-4 mb-3 md:mb-4 border border-gray-600">
              <h2 className="text-base md:text-lg lg:text-xl font-light text-white leading-relaxed m-0">
                {problemText}
              </h2>
            </div>

            {/* Answer Buttons - Compact layout */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 max-w-xs md:max-w-sm lg:max-w-md mx-auto">
            {options.map((option, index) => (
              <AnswerButton
                key={index}
                text={option.text}
                value={option.value}
                onClick={() => onAnswer(option.value)}
                variant={answerVariants[index]}
                  disabled={isLoading || selectedAnswer !== null}
                  letter={String.fromCharCode(65 + index)} // A, B, C, D
                  isSelected={selectedAnswer === option.value}
                  isCorrect={correctAnswer === option.value}
                  showFeedback={showResult}
              />
            ))}
          </div>
        </div>
        )}
      </div>


    </div>
  )
}
