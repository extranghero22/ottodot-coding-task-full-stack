interface AnswerButtonProps {
  text: string
  value: number
  onClick: () => void
  variant: 'red' | 'blue' | 'yellow' | 'green'
  disabled?: boolean
  // New props for enhanced functionality
  letter: string
  isSelected?: boolean
  isCorrect?: boolean
  showFeedback?: boolean
}

const buttonConfig = {
  red: {
    letter: 'A'
  },
  blue: {
    letter: 'B'
  },
  yellow: {
    letter: 'C'
  },
  green: {
    letter: 'D'
  }
}

export default function AnswerButton({ 
  text, 
  value, 
  onClick, 
  variant, 
  disabled = false,
  letter,
  isSelected = false,
  isCorrect = false,
  showFeedback = false
}: AnswerButtonProps) {
  const config = buttonConfig[variant]

  // Determine button colors based on state
  const getButtonColors = () => {
    if (showFeedback && isSelected) {
      return {
        backgroundColor: isCorrect ? '#22c55e' : '#ef4444', // green for correct, red for wrong
        color: '#ffffff',
        borderColor: isCorrect ? '#16a34a' : '#dc2626'
      }
    }
    if (showFeedback && isCorrect) {
      return {
        backgroundColor: '#22c55e', // green for correct answer
        color: '#ffffff',
        borderColor: '#16a34a'
      }
    }
    if (isSelected) {
      return {
        backgroundColor: '#3b82f6', // blue for selected
        color: '#ffffff',
        borderColor: '#2563eb'
      }
    }
    return {
      backgroundColor: disabled ? '#333333' : '#ffffff',
      color: disabled ? '#666666' : '#000000',
      borderColor: '#333333'
    }
  }

  const colors = getButtonColors()

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: colors.backgroundColor,
        color: colors.color,
        border: `2px solid ${colors.borderColor}`,
        borderRadius: '6px',
        padding: 'clamp(0.6rem, 3vw, 0.75rem) clamp(0.8rem, 4vw, 1rem)',
        fontSize: 'clamp(0.8rem, 3.5vw, 0.9rem)',
        fontWeight: '500',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(0.3rem, 2vw, 0.5rem)',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: 'clamp(45px, 12vw, 50px)',
        width: '100%',
        textAlign: 'center'
      }}
      onMouseEnter={(e) => {
        if (!disabled && !showFeedback) {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !showFeedback) {
          e.currentTarget.style.backgroundColor = colors.backgroundColor;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <span style={{ 
        fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',
        fontWeight: 'bold',
        minWidth: 'clamp(1.5rem, 6vw, 2rem)',
        textAlign: 'center'
      }}>
        {letter}
      </span>
      <span style={{ 
        textAlign: 'left', 
        flex: 1,
        fontSize: 'clamp(0.8rem, 3.5vw, 0.9rem)'
      }}>
        {text}
      </span>
    </button>
  )
}
