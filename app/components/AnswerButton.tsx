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

  // Determine button classes based on state
  const getButtonClasses = () => {
    const baseClasses = 'border-2 rounded-md px-3 py-2 md:px-4 md:py-3 text-sm md:text-base font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 md:gap-3 font-sans min-h-11 md:min-h-12 w-full text-center'
    
    if (showFeedback && isSelected) {
      return `${baseClasses} ${isCorrect ? 'bg-green-500 text-white border-green-600' : 'bg-red-500 text-white border-red-600'}`
    }
    if (showFeedback && isCorrect) {
      return `${baseClasses} bg-green-500 text-white border-green-600`
    }
    if (isSelected) {
      return `${baseClasses} bg-blue-500 text-white border-blue-600`
    }
    return `${baseClasses} ${disabled ? 'bg-gray-700 text-gray-400 border-gray-600 opacity-50 cursor-not-allowed' : 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:-translate-y-0.5'}`
  }

  const buttonClasses = getButtonClasses()

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      <span className="text-lg md:text-xl font-bold min-w-6 md:min-w-8 text-center">
        {letter}
      </span>
      <span className="text-left flex-1 text-sm md:text-base">
        {text}
      </span>
    </button>
  )
}