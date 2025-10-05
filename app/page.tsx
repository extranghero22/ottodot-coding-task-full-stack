'use client'

import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import QuestionScreen from './components/QuestionScreen'
import SettingsModal from './components/SettingsModal'
import MetricsModal from './components/MetricsModal'
import HintModal from './components/HintModal'
import ScoreCard from './components/ScoreCard'
import HistoryModal from './components/HistoryModal'
import LoadingSpinner from './components/LoadingSpinner'

interface MathProblem {
  problem_text: string
  final_answer: number
  options: Array<{text: string, value: number}>
  difficulty?: string
  topic?: string
  hint?: string
}

export default function Home() {
  const [problem, setProblem] = useState<MathProblem | null>(null)
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [answerCount, setAnswerCount] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  // New state for optional features
  const [difficulty, setDifficulty] = useState('medium')
  const [topic, setTopic] = useState<string | null>(null)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalIncorrect, setTotalIncorrect] = useState(0)
  const [totalHintsUsed, setTotalHintsUsed] = useState(0)
  const [hintUsedCurrentQuestion, setHintUsedCurrentQuestion] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showMetricsModal, setShowMetricsModal] = useState(false)
  const [showHintModal, setShowHintModal] = useState(false)
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [userId, setUserId] = useState<string | null>(null)

  // Initialize or retrieve user ID from localStorage
  useEffect(() => {
    const getUserId = () => {
      const storedUserId = localStorage.getItem('math_app_user_id')

      if (storedUserId) {
        setUserId(storedUserId)
      } else {
        // Generate new unique user ID
        const newUserId = crypto.randomUUID()
        localStorage.setItem('math_app_user_id', newUserId)
        setUserId(newUserId)
      }
    }

    getUserId()
  }, [])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (timerEnabled && timeRemaining > 0 && !feedback) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Just stop the timer, don't auto-proceed to next question
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerEnabled, timeRemaining, feedback])

  // Reset timer when new question starts
  useEffect(() => {
    if (problem && timerEnabled) {
      const totalTime = problem.difficulty === 'easy' ? 60 : problem.difficulty === 'medium' ? 90 : 120
      setTimeRemaining(totalTime)
    }
  }, [problem, timerEnabled])
  const generateProblem = async () => {
    setIsLoading(true)
    setFeedback('')
    setIsCorrect(null)
    setHintUsedCurrentQuestion(false)
    setTimeSpent(0)

    try {
      const response = await fetch('/api/generate-problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficulty,
          topic,
          user_id: userId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate problem')
      }

      const data = await response.json()
      setProblem({
        problem_text: data.problem_text,
        final_answer: data.final_answer,
        options: data.options,
        difficulty: data.difficulty,
        topic: data.topic,
        hint: data.hint
      })
      setSessionId(data.session_id)
    } catch (error) {
      console.error('Error generating problem:', error)
      setFeedback('Failed to generate a problem. Please try again.')
      setIsCorrect(false)
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async (answerValue: number) => {
    if (!sessionId) {
      setFeedback('Please generate a problem first.')
      return
    }

    setIsLoading(true)
    setAnswerCount(prev => prev + 1)
    setSelectedAnswer(answerValue)

    try {
      const response = await fetch('/api/submit-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_answer: answerValue,
          time_spent_seconds: timeSpent,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit answer')
      }

      const data = await response.json()
      setFeedback(data.feedback)
      setIsCorrect(data.is_correct)

      // Update score tracking
      if (data.is_correct) {
        setTotalCorrect(prev => prev + 1)
      } else {
        setTotalIncorrect(prev => prev + 1)
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      setFeedback('Failed to submit your answer. Please try again.')
      setIsCorrect(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextQuestion = () => {
    setQuestionNumber(prev => prev + 1)
    setSelectedAnswer(null)
    setHintUsedCurrentQuestion(false)
    generateProblem()
  }

  const handleHintUsed = () => {
    if (!hintUsedCurrentQuestion) {
      setTotalHintsUsed(prev => prev + 1)
      setHintUsedCurrentQuestion(true)
    }
  }

  const handleTimeUp = () => {
    if (!feedback && problem) {
      // Auto-submit with a wrong answer when time runs out
      setFeedback('Time is up! The question will move to the next one.')
      setIsCorrect(false)
      setTotalIncorrect(prev => prev + 1)

      // Auto move to next question after 2 seconds
      setTimeout(() => {
        handleNextQuestion()
      }, 2000)
    }
  }

  // Show loading spinner when transitioning between questions
  if (isLoading && !problem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" color="#4f46e5" />
          <p className="mt-4 text-gray-600 font-medium">Generating your next question...</p>
        </div>
      </div>
    )
  }

  // Render appropriate screen based on state
  if (!problem && !feedback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Score Card - Only show if user has attempted problems */}
          {(totalCorrect + totalIncorrect) > 0 && (
            <ScoreCard
              totalQuestions={totalCorrect + totalIncorrect}
              correctAnswers={totalCorrect}
              incorrectAnswers={totalIncorrect}
              hintsUsed={totalHintsUsed}
            />
          )}

          {/* Start Screen */}
          <StartScreen 
            onStart={generateProblem} 
            isLoading={isLoading} 
            onSettingsClick={() => setShowSettingsModal(true)}
          />

          {/* History Modal */}
          <HistoryModal
            isOpen={showHistory}
            onClose={() => setShowHistory(false)}
          />

          {/* Settings Modal */}
          <SettingsModal
            isOpen={showSettingsModal}
            onClose={() => setShowSettingsModal(false)}
            difficulty={difficulty}
            topic={topic}
            timerEnabled={timerEnabled}
            onDifficultyChange={setDifficulty}
            onTopicChange={setTopic}
            onTimerToggle={setTimerEnabled}
          />
        </div>
      </div>
    )
  }

  if (problem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto relative">
          {/* Loading overlay when submitting answer */}
          {isLoading && feedback && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg">
              <div className="text-center bg-white p-6 rounded-lg shadow-lg">
                <LoadingSpinner size="large" color="#4f46e5" />
                <p className="mt-4 text-gray-600 font-medium">Checking your answer...</p>
              </div>
            </div>
          )}

          {/* Question Screen */}
          <QuestionScreen
            questionNumber={questionNumber}
            answerCount={answerCount}
            problemText={problem.problem_text}
            options={problem.options}
            onAnswer={submitAnswer}
            isLoading={isLoading}
            showResult={!!feedback}
            isCorrect={isCorrect}
            feedback={feedback}
            onNext={handleNextQuestion}
            selectedAnswer={selectedAnswer}
            correctAnswer={problem.final_answer}
            onMetricsClick={() => setShowMetricsModal(true)}
            onHistoryClick={() => setShowHistory(true)}
            onHintClick={() => setShowHintModal(true)}
            hint={problem.hint}
            timeRemaining={timeRemaining}
            totalTime={problem.difficulty === 'easy' ? 60 : problem.difficulty === 'medium' ? 90 : 120}
            timerEnabled={timerEnabled}
          />

          {/* Topic and Difficulty Display */}
          <div className="mt-4 flex gap-2 justify-center flex-wrap">
            {problem.difficulty && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                problem.difficulty === 'easy'
                  ? 'bg-green-100 text-green-800'
                  : problem.difficulty === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
              </span>
            )}
            {problem.topic && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {problem.topic}
              </span>
            )}
          </div>

          {/* History Modal */}
          <HistoryModal
            isOpen={showHistory}
            onClose={() => setShowHistory(false)}
          />

          {/* Metrics Modal */}
          <MetricsModal
            isOpen={showMetricsModal}
            onClose={() => setShowMetricsModal(false)}
            totalQuestions={totalCorrect + totalIncorrect}
            correctAnswers={totalCorrect}
            incorrectAnswers={totalIncorrect}
            hintsUsed={totalHintsUsed}
          />

          {/* Hint Modal */}
          <HintModal
            isOpen={showHintModal}
            onClose={() => setShowHintModal(false)}
            hint={problem.hint}
            onHintUsed={handleHintUsed}
            disabled={isLoading || hintUsedCurrentQuestion}
          />
        </div>
      </div>
    )
  }

  return null
}
