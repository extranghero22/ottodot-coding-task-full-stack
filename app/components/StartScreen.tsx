interface StartScreenProps {
  onStart: () => void
  isLoading: boolean
  onSettingsClick: () => void
}

export default function StartScreen({ onStart, isLoading, onSettingsClick }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 font-sans">
      <div className="text-center max-w-2xl text-white">
        {/* Simple Monochrome Icon */}
        <div className="mb-12">
          <div className="inline-block bg-gray-800 rounded-full p-8 border border-gray-600">
            <span className="text-5xl grayscale brightness-75">🧮</span>
          </div>
        </div>

        {/* Clean Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 leading-tight text-white px-4">
          Ready to solve<br />
          <span className="font-semibold">some math?</span>
        </h1>

        {/* Simple Description */}
        <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto px-4">
          Test your Primary 5 math skills with AI-generated problems that adapt to your learning pace
        </p>

        {/* Button Container */}
        <div className="flex flex-col gap-4 justify-center items-center mb-8 w-full px-4">
          {/* Start Learning Button */}
                  <button
                    onClick={onStart}
                    disabled={isLoading}
                    className={`px-8 py-4 text-base md:text-lg font-medium rounded-lg transition-all duration-200 flex items-center gap-2 w-full max-w-xs justify-center ${
                      isLoading 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-black hover:bg-gray-100 cursor-pointer'
                    }`}
                  >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              <>
                Start Learning
                <span className="text-xl">→</span>
              </>
            )}
          </button>

          {/* Settings Button */}
                  <button
                    onClick={onSettingsClick}
                    disabled={isLoading}
                    className={`px-8 py-4 text-base md:text-lg font-medium rounded-lg transition-all duration-200 flex items-center gap-2 w-full max-w-xs justify-center ${
                      isLoading 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
                    }`}
                  >
            ⚙️ Settings
          </button>
        </div>

        {/* Simple Feature List */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <span>⚡ AI-Powered</span>
          <span>🎓 Primary 5 Level</span>
          <span>💡 Instant Feedback</span>
          <span>🚀 Adaptive Learning</span>
        </div>

        {/* Subtle Footer */}
        <div className="mt-8 text-xs text-gray-600">
          Ready to begin your math journey
        </div>
      </div>
    </div>
  )
}
