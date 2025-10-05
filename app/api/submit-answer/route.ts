import { GoogleGenerativeAI } from '@google/generative-ai'
import { supabase } from '@/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { session_id, user_answer, time_spent_seconds } = body

    // Validate input
    if (!session_id || user_answer === undefined || user_answer === null) {
      return NextResponse.json(
        { error: 'Missing session_id or user_answer' },
        { status: 400 }
      )
    }

    // Get the original problem from database
    const { data: session, error: sessionError } = await supabase
      .from('math_problem_sessions')
      .select('*')
      .eq('id', session_id)
      .single()

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Check if answer is correct
    const isCorrect = Number(user_answer) === Number(session.correct_answer)

    // Generate personalized feedback using AI
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const feedbackPrompt = `You are a helpful and encouraging math tutor for Primary 5 students (age 10-11) following Singapore Primary Mathematics pedagogy.

PEDAGOGICAL PRINCIPLES (from Singapore Math Curriculum):
- Build confidence and foster interest in mathematics
- Develop thinking, reasoning, and communication skills
- Focus on conceptual understanding over memorization
- Provide timely, specific feedback that helps students improve
- Be encouraging but honest about errors
- Support metacognition (help students reflect on their thinking)

CONTEXT:
Original Problem: ${session.problem_text}
Correct Answer: ${session.correct_answer}
Student's Answer: ${user_answer}
Is Correct: ${isCorrect}

FEEDBACK REQUIREMENTS:
${isCorrect
  ? `CORRECT ANSWER - Your feedback should:
- Celebrate their success warmly and specifically
- Briefly explain WHY the solution works (build understanding)
- Encourage them to try more problems
- 2-3 sentences maximum`
  : `INCORRECT ANSWER - Your feedback should:
- Acknowledge their effort positively
- Identify the specific ERROR or MISCONCEPTION (e.g., "It looks like you added instead of subtracted")
- Give a HINT about the correct approach WITHOUT revealing the full answer
- Encourage them to try again with this new understanding
- 3-4 sentences maximum`
}

TONE: Warm, encouraging, age-appropriate (10-11 years old), patient, growth-mindset focused

Return ONLY the feedback text (no JSON, no markdown, no special formatting).`

    const result = await model.generateContent(feedbackPrompt)
    const response = await result.response
    const feedbackText = response.text().trim()

    // Save submission to database
    const { data: submission, error: submissionError } = await supabase
      .from('math_problem_submissions')
      .insert({
        session_id: session_id,
        user_answer: Number(user_answer),
        is_correct: isCorrect,
        feedback_text: feedbackText,
        time_spent_seconds: time_spent_seconds || 0
      })
      .select()
      .single()

    if (submissionError) {
      console.error('Database error:', submissionError)
      throw new Error('Failed to save submission to database')
    }

    return NextResponse.json({
      is_correct: isCorrect,
      feedback: feedbackText,
      correct_answer: session.correct_answer
    })

  } catch (error) {
    console.error('Error submitting answer:', error)
    return NextResponse.json(
      { error: 'Failed to submit answer. Please try again.' },
      { status: 500 }
    )
  }
}
