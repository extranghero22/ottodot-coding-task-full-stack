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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '0.75rem',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        border: '1px solid #333333',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#cccccc',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#cccccc';
          }}
        >
          ×
        </button>

        {/* Title */}
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '300',
          marginBottom: '1.5rem',
          color: '#ffffff',
          paddingRight: '2rem'
        }}>
          Your Progress
        </h2>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {/* Total Questions */}
          <div style={{
            backgroundColor: '#333333',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            border: '1px solid #555555',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '0.5rem'
            }}>
              {totalQuestions}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#cccccc',
              fontWeight: '500'
            }}>
              Questions
            </div>
          </div>

          {/* Correct Answers */}
          <div style={{
            backgroundColor: '#333333',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            border: '1px solid #555555',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#4ade80',
              marginBottom: '0.5rem'
            }}>
              {correctAnswers}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#cccccc',
              fontWeight: '500'
            }}>
              Correct
            </div>
          </div>

          {/* Accuracy */}
          <div style={{
            backgroundColor: '#333333',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            border: '1px solid #555555',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '0.5rem'
            }}>
              {accuracy}%
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#cccccc',
              fontWeight: '500'
            }}>
              Accuracy
            </div>
          </div>

          {/* Hints Used */}
          <div style={{
            backgroundColor: '#333333',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            border: '1px solid #555555',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#a78bfa',
              marginBottom: '0.5rem'
            }}>
              {hintsUsed}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#cccccc',
              fontWeight: '500'
            }}>
              Hints Used
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {totalQuestions > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontSize: '0.875rem',
                color: '#cccccc',
                fontWeight: '500'
              }}>
                Overall Progress
              </span>
              <span style={{
                fontSize: '0.875rem',
                color: '#ffffff',
                fontWeight: '600'
              }}>
                {accuracy}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#333333',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid #555555'
            }}>
              <div style={{
                width: `${accuracy}%`,
                height: '100%',
                backgroundColor: '#4ade80',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
