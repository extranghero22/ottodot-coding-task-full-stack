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
  timerEnabled = false
}: QuestionScreenProps) {
  const answerVariants: ('red' | 'blue' | 'yellow' | 'green')[] = ['red', 'blue', 'yellow', 'green']

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Top Header - Question Display */}
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '0.75rem 1rem',
        borderBottom: '1px solid #333333'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                backgroundColor: '#333333',
                borderRadius: '50%',
                width: 'clamp(28px, 6vw, 32px)',
                height: 'clamp(28px, 6vw, 32px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #555555'
              }}>
                <span style={{ 
                  fontWeight: '900', 
                  color: '#ffffff', 
                  fontSize: 'clamp(0.8rem, 3vw, 1rem)' 
                }}>
                  {questionNumber}
                </span>
              </div>
              <div style={{ 
                color: '#cccccc', 
                fontSize: 'clamp(0.7rem, 3vw, 0.75rem)', 
                fontWeight: '600' 
              }}>
                Question {questionNumber}
              </div>
            </div>
            
            {/* Header Buttons */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.25rem',
              flexWrap: 'wrap'
            }}>
              {/* Circular Timer - Only show if enabled */}
              {timerEnabled && (
                <div style={{
                  position: 'relative',
                  width: 'clamp(32px, 8vw, 40px)',
                  height: 'clamp(32px, 8vw, 40px)',
                  borderRadius: '50%',
                  backgroundColor: '#333333',
                  border: '2px solid #555555',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Timer Circle Background */}
                  <svg
                    width="clamp(28, 6vw, 36)"
                    height="clamp(28, 6vw, 36)"
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: '2px',
                      transform: 'rotate(-90deg)'
                    }}
                  >
                    <circle
                      cx="clamp(14, 3vw, 18)"
                      cy="clamp(14, 3vw, 18)"
                      r="clamp(12, 2.5vw, 16)"
                      fill="none"
                      stroke="#555555"
                      strokeWidth="2"
                    />
                    <circle
                      cx="clamp(14, 3vw, 18)"
                      cy="clamp(14, 3vw, 18)"
                      r="clamp(12, 2.5vw, 16)"
                      fill="none"
                      stroke={timeRemaining <= 10 ? '#ef4444' : timeRemaining <= 30 ? '#fbbf24' : '#22c55e'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * (timeRemaining <= 10 ? 12 : timeRemaining <= 30 ? 12 : 16)}`}
                      strokeDashoffset={`${2 * Math.PI * (timeRemaining <= 10 ? 12 : timeRemaining <= 30 ? 12 : 16) * (1 - timeRemaining / totalTime)}`}
                      style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                  </svg>
                  {/* Timer Text */}
                  <span style={{
                    fontSize: 'clamp(0.6rem, 2.5vw, 0.75rem)',
                    fontWeight: '600',
                    color: '#ffffff',
                    zIndex: 1
                  }}>
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}

              {/* Metrics Button */}
              <button
                onClick={onMetricsClick}
                style={{
                  backgroundColor: 'transparent',
                  color: '#cccccc',
                  border: '1px solid #555555',
                  padding: '0.4rem 0.6rem',
                  fontSize: 'clamp(0.6rem, 2.5vw, 0.75rem)',
                  fontWeight: '500',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333333';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = '#666666';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#cccccc';
                  e.currentTarget.style.borderColor = '#555555';
                }}
              >
                📊 Metrics
              </button>

              {/* History Button */}
              <button
                onClick={onHistoryClick}
                style={{
                  backgroundColor: 'transparent',
                  color: '#cccccc',
                  border: '1px solid #555555',
                  padding: '0.4rem 0.6rem',
                  fontSize: 'clamp(0.6rem, 2.5vw, 0.75rem)',
                  fontWeight: '500',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333333';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = '#666666';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#cccccc';
                  e.currentTarget.style.borderColor = '#555555';
                }}
              >
                📚 History
              </button>

              {/* Hint Button - Only show if hint is available */}
              {hint && (
                <button
                  onClick={onHintClick}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#cccccc',
                    border: '1px solid #555555',
                    padding: '0.4rem 0.6rem',
                    fontSize: 'clamp(0.6rem, 2.5vw, 0.75rem)',
                    fontWeight: '500',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333333';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#666666';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#cccccc';
                    e.currentTarget.style.borderColor = '#555555';
                  }}
                >
                  💡 Hint
                </button>
              )}

              {/* Answer Count Badge */}
              <div style={{
                backgroundColor: '#333333',
                borderRadius: '9999px',
                padding: '0.2rem 0.6rem',
                border: '1px solid #555555'
              }}>
                <span style={{ 
                  color: '#ffffff', 
                  fontWeight: '700', 
                  fontSize: 'clamp(0.6rem, 2.5vw, 0.75rem)' 
                }}>
                {answerCount} {answerCount === 1 ? 'Answer' : 'Answers'}
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem',
        backgroundColor: '#000000',
        minHeight: 0
      }}>
        {showResult ? (
          /* Result Content - Compact */
          <div style={{ 
            textAlign: 'center', 
            maxWidth: 'clamp(300px, 90vw, 400px)', 
            color: 'white',
            width: '100%',
            padding: '0 0.5rem'
          }}>
            {/* Status Icon */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{
                display: 'inline-block',
                backgroundColor: '#1a1a1a',
                borderRadius: '50%',
                padding: '0.75rem',
                border: '1px solid #333333'
              }}>
                <span style={{ 
                  fontSize: '1.5rem',
                  filter: 'grayscale(100%) brightness(0.8)'
                }}>
                  {isCorrect ? '✓' : '✗'}
            </span>
          </div>
        </div>

            {/* Result Heading */}
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '300',
              marginBottom: '0.5rem',
              lineHeight: '1.2',
              color: '#ffffff'
            }}>
              {isCorrect ? 'Correct!' : 'Not quite!'}
            </h2>

            {/* Subheading */}
            <p style={{
              fontSize: '0.9rem',
              color: '#cccccc',
              marginBottom: '0.75rem',
              fontWeight: '400'
            }}>
              {isCorrect ? 'You got it right!' : 'Keep trying, you can do it!'}
            </p>

            {/* Feedback */}
            <div style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              marginBottom: '1rem',
              border: '1px solid #333333'
            }}>
              <p style={{
                fontSize: '0.8rem',
                color: '#ffffff',
                lineHeight: '1.4',
                margin: 0
              }}>
                {feedback}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={onNext}
              disabled={isLoading}
              style={{
                backgroundColor: isLoading ? '#333333' : '#ffffff',
                color: isLoading ? '#666666' : '#000000',
                border: 'none',
                padding: '0.75rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    border: '2px solid #666666',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Loading...
                </>
              ) : (
                <>
                  Next Question
                  <span style={{ fontSize: '0.9rem' }}>→</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Question Content - Expanded to fill space */
          <div style={{ 
            width: '100%', 
            maxWidth: 'clamp(300px, 95vw, 800px)', 
            textAlign: 'center',
            color: 'white',
            padding: '0 0.5rem'
          }}>
            {/* Question Text - Optimized for no scroll */}
            <div style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '0.5rem',
              padding: 'clamp(0.75rem, 3vw, 1rem)',
              marginBottom: 'clamp(0.75rem, 3vw, 1rem)',
              border: '1px solid #333333'
            }}>
              <h2 style={{
                fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                fontWeight: '300',
                color: '#ffffff',
                lineHeight: '1.3',
                margin: 0
              }}>
                {problemText}
              </h2>
      </div>

            {/* Answer Buttons - Compact layout */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(0.5rem, 2vw, 0.75rem)',
              rowGap: 'clamp(0.5rem, 2vw, 0.75rem)',
              maxWidth: 'clamp(280px, 80vw, 500px)',
              margin: '0 auto'
            }}>
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


      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
