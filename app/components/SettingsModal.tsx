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
        padding: 'clamp(1rem, 5vw, 2rem)',
        maxWidth: 'clamp(300px, 95vw, 500px)',
        width: '100%',
        maxHeight: '90vh',
        border: '1px solid #333333',
        position: 'relative',
        overflow: 'auto'
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
          Practice Settings
        </h2>

        {/* Settings Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 4vw, 1.5rem)' }}>
          {/* Difficulty Selection */}
          <div>
            <label style={{
              display: 'block',
              fontSize: 'clamp(0.8rem, 3.5vw, 0.875rem)',
              fontWeight: '500',
              marginBottom: '0.75rem',
              color: '#cccccc'
            }}>
              Difficulty Level
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => onDifficultyChange(level)}
                  style={{
                    flex: 1,
                    minWidth: '80px',
                    padding: 'clamp(0.6rem, 3vw, 0.75rem) clamp(0.8rem, 4vw, 1rem)',
                    borderRadius: '6px',
                    fontWeight: '500',
                    fontSize: 'clamp(0.8rem, 3.5vw, 0.875rem)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: difficulty === level ? '#ffffff' : '#333333',
                    color: difficulty === level ? '#000000' : '#cccccc',
                    border: `1px solid ${difficulty === level ? '#ffffff' : '#555555'}`
                  }}
                  onMouseEnter={(e) => {
                    if (difficulty !== level) {
                      e.currentTarget.style.backgroundColor = '#444444';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (difficulty !== level) {
                      e.currentTarget.style.backgroundColor = '#333333';
                    }
                  }}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Selection */}
          <div>
            <label htmlFor="topic-select" style={{
              display: 'block',
              fontSize: 'clamp(0.8rem, 3.5vw, 0.875rem)',
              fontWeight: '500',
              marginBottom: '0.75rem',
              color: '#cccccc'
            }}>
              Topic Focus
            </label>
            <select
              id="topic-select"
              value={topic || ''}
              onChange={(e) => onTopicChange(e.target.value || null)}
              style={{
                width: '100%',
                padding: 'clamp(0.6rem, 3vw, 0.75rem) clamp(0.8rem, 4vw, 1rem)',
                borderRadius: '6px',
                border: '1px solid #555555',
                backgroundColor: '#333333',
                color: '#ffffff',
                fontSize: 'clamp(0.8rem, 3.5vw, 0.875rem)',
                cursor: 'pointer'
              }}
            >
              {topics.map((t) => (
                <option key={t.label} value={t.value || ''} style={{
                  backgroundColor: '#333333',
                  color: '#ffffff'
                }}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Timer Toggle */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.75rem',
              color: '#cccccc'
            }}>
              Timer
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 1rem',
              backgroundColor: '#333333',
              borderRadius: '6px',
              border: '1px solid #555555'
            }}>
              <button
                onClick={() => onTimerToggle(!timerEnabled)}
                style={{
                  width: '48px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  backgroundColor: timerEnabled ? '#4ade80' : '#555555',
                  position: 'relative',
                  padding: 0
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  position: 'absolute',
                  top: '2px',
                  left: timerEnabled ? '26px' : '2px',
                  transition: 'left 0.2s ease'
                }} />
              </button>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.875rem',
                  color: timerEnabled ? '#ffffff' : '#cccccc',
                  fontWeight: '500'
                }}>
                  {timerEnabled ? 'Enabled' : 'Disabled'}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#888888',
                  marginTop: '0.125rem'
                }}>
                  {timerEnabled
                    ? 'Easy: 30s • Medium: 1m • Hard: 2m'
                    : 'No time limit for questions'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Text */}
        <div style={{
          marginTop: '1.5rem',
          padding: '0.75rem',
          backgroundColor: '#333333',
          borderRadius: '6px',
          border: '1px solid #555555'
        }}>
          <p style={{
            fontSize: '0.8rem',
            color: '#cccccc',
            margin: 0,
            lineHeight: '1.4'
          }}>
            <span style={{ fontWeight: '500', color: '#ffffff' }}>Tip:</span> Start with Easy problems to build confidence,
            then progress to Medium and Hard. Choose a topic to focus on specific areas!
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1.5rem',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              border: '1px solid #555555',
              backgroundColor: 'transparent',
              color: '#cccccc',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333333';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#cccccc';
            }}
          >
            Cancel
          </button>
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
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
