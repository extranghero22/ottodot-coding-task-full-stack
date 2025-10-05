'use client'

interface ScoreCardProps {
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  hintsUsed: number
}

export default function ScoreCard({
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  hintsUsed,
}: ScoreCardProps) {
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white mb-6">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Questions */}
        <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold">{totalQuestions}</div>
          <div className="text-sm opacity-90">Questions</div>
        </div>

        {/* Correct */}
        <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-green-300">{correctAnswers}</div>
          <div className="text-sm opacity-90">Correct</div>
        </div>

        {/* Accuracy */}
        <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold">
            {accuracy}
            <span className="text-xl">%</span>
          </div>
          <div className="text-sm opacity-90">Accuracy</div>
        </div>

        {/* Hints Used */}
        <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-purple-300">{hintsUsed}</div>
          <div className="text-sm opacity-90">Hints Used</div>
        </div>
      </div>

      {/* Progress Bar */}
      {totalQuestions > 0 && (
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{accuracy}% Accuracy</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>
      )}

      {/* Motivational Message */}
      <div className="mt-4 text-center">
        {accuracy >= 80 && totalQuestions >= 5 && (
          <p className="text-sm font-medium">🌟 Excellent work! You're a math star!</p>
        )}
        {accuracy >= 60 && accuracy < 80 && totalQuestions >= 5 && (
          <p className="text-sm font-medium">👍 Good job! Keep practicing to improve!</p>
        )}
        {accuracy < 60 && totalQuestions >= 5 && (
          <p className="text-sm font-medium">💪 Keep trying! Every mistake is a learning opportunity!</p>
        )}
        {totalQuestions < 5 && totalQuestions > 0 && (
          <p className="text-sm font-medium">🚀 Great start! Keep going!</p>
        )}
      </div>
    </div>
  )
}
