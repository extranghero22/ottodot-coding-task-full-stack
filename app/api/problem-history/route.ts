import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Get user_id from query parameters
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')

    // Build query - get data from both tables
    let query = supabase
      .from('math_problem_sessions')
      .select(`
        id,
        created_at,
        problem_text,
        correct_answer,
        options,
        difficulty,
        topic,
        hint_text,
        math_problem_submissions!inner(
          user_answer,
          is_correct,
          feedback_text,
          hint_used,
          time_spent_seconds,
          created_at
        )
      `)
      .order('created_at', { ascending: false })
      .limit(50) // Limit to last 50 problems

    // Filter by user_id if provided
    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching history:', error)
      return NextResponse.json(
        { error: 'Failed to fetch problem history' },
        { status: 500 }
      )
    }

    // Transform the data to match the expected format
    const transformedData = data?.map(item => ({
      session_id: item.id,
      created_at: item.created_at,
      problem_text: item.problem_text,
      correct_answer: item.correct_answer,
      options: item.options,
      difficulty: item.difficulty || 'medium',
      topic: item.topic,
      hint_text: item.hint_text,
      user_answer: item.math_problem_submissions?.[0]?.user_answer,
      is_correct: item.math_problem_submissions?.[0]?.is_correct,
      feedback_text: item.math_problem_submissions?.[0]?.feedback_text,
      hint_used: item.math_problem_submissions?.[0]?.hint_used || false,
      time_spent_seconds: item.math_problem_submissions?.[0]?.time_spent_seconds,
      submitted_at: item.math_problem_submissions?.[0]?.created_at
    })) || []

    return NextResponse.json({ history: transformedData })
  } catch (error) {
    console.error('Error in problem history API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
