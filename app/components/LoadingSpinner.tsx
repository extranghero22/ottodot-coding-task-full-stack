interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

export default function LoadingSpinner({ size = 'medium', color = '#333333' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8', 
    large: 'w-12 h-12'
  }

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizeClasses[size]} border-2 border-gray-300 border-t-transparent rounded-full animate-spin`}
        style={{ borderTopColor: color }}
      />
    </div>
  )
}
