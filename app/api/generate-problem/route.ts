import { GoogleGenerativeAI } from '@google/generative-ai'
import { supabase } from '@/lib/supabaseClient'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    // Get difficulty, topic, and user_id from request body
    const body = await request.json().catch(() => ({}))
    const { difficulty = 'medium', topic = null, user_id = null } = body

    // Validate difficulty
    const validDifficulties = ['easy', 'medium', 'hard']
    const selectedDifficulty = validDifficulties.includes(difficulty) ? difficulty : 'medium'

    // Generate problem using Gemini AI
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Build difficulty-specific instructions
    const difficultyInstructions = {
      easy: `DIFFICULTY: EASY
- Use smaller numbers (within 100 for whole numbers, simple fractions like 1/2, 1/4)
- Single-step problems or very simple two-step problems
- Clear, straightforward contexts
- Basic operations without complex reasoning`,
      medium: `DIFFICULTY: MEDIUM
- Use moderate numbers (within 10,000 for whole numbers, fractions with denominators up to 12)
- Two to three-step problems
- Realistic contexts requiring some analysis
- May involve multiple operations or concepts`,
      hard: `DIFFICULTY: HARD
- Use larger numbers (up to 10 million for whole numbers, complex fractions)
- Multi-step problems (3-4 steps)
- Complex real-world scenarios requiring deeper reasoning
- May involve order of operations, brackets, or multiple concepts combined`
    }

    const topicFilter = topic ? `\n    REQUIRED TOPIC: Focus ONLY on "${topic}" problems.\n` : ''

    const prompt = `Generate a multiple choice math word problem suitable for Primary 5 students (age 10-11) following the Singapore Primary Mathematics Syllabus.

    ${difficultyInstructions[selectedDifficulty]}
    ${topicFilter}
    CURRICULUM REQUIREMENTS - Choose ONE topic from:

    NUMBER & ALGEBRA:
    - Whole numbers (up to 10 million, order of operations with brackets)
    - Fractions (four operations, especially multiplication by whole numbers and proper fractions)
    - Decimals (multiplying/dividing by 10/100/1000, converting measurements)
    - Percentage (finding percentage of whole, discount, GST, annual interest)
    - Rate problems (quantity per unit of another quantity)

    MEASUREMENT & GEOMETRY:
    - Area of triangle (using base × height ÷ 2, composite figures)
    - Volume of cube/cuboid (including liquid volume, relationship between ℓ and cm³)
    - Angles (on straight lines, at points, vertically opposite, finding unknowns)
    - Properties of triangles (isosceles, equilateral, right-angled, angle sum)
    - Properties of quadrilaterals (parallelogram, rhombus, trapezium)

    PROBLEM DESIGN PRINCIPLES:
    - Use realistic, age-appropriate contexts from everyday life
    - Focus on conceptual understanding, not just procedural skills
    - Encourage mathematical reasoning and problem-solving
    - Numbers should be within students' computational ability

    IMPORTANT: First solve the problem step by step to ensure you get the correct answer.
    Then create 3 plausible wrong answers (distractors) based on common student errors.

    Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks):
    {
      "problem_text": "A detailed word problem in a real-world context",
      "topic": "One of: Whole Numbers, Fractions, Decimals, Percentage, Rate, Area, Volume, Angles, Triangles, Quadrilaterals",
      "difficulty": "${selectedDifficulty}",
      "options": [
        {"text": "Option A", "value": 10},
        {"text": "Option B", "value": 20},
        {"text": "Option C", "value": 30},
        {"text": "Option D", "value": 40}
      ],
      "correct_answer": 20,
      "solution_steps": "Clear step-by-step calculation showing working",
      "hint": "A helpful hint that guides toward the solution without revealing the answer"
    }

    VALIDATION CHECKLIST:
    - correct_answer MUST match one option value exactly
    - All option values are numbers (not strings)
    - Distractors represent common misconceptions (e.g., forgetting to carry, wrong operation, partial calculation)
    - Answer is mathematically CORRECT per solution_steps
    - Problem text is clear, unambiguous, and age-appropriate

    Example (Whole Numbers):
    Problem: A school library has 2,450 books. During the book fair, they bought 385 new books and donated 127 old books to charity. How many books does the library have now?
    Solution: 2,450 + 385 - 127 = 2,835 - 127 = 2,708
    Options: [2,562 (forgot donation), 2,708 (correct), 2,835 (forgot subtraction), 2,958 (added all)]

    Double-check your arithmetic before responding!`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the AI response
    let problemData
    try {
      // Clean the response - remove markdown code blocks if present
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      problemData = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error('Failed to parse AI response:', text)
      throw new Error('Invalid AI response format')
    }

    // Validate the response structure
    if (!problemData.problem_text || !problemData.options || !Array.isArray(problemData.options) || 
        problemData.options.length !== 4 || typeof problemData.correct_answer !== 'number') {
      throw new Error('Invalid problem data structure')
    }

    // Validate that correct_answer matches one of the options
    const optionValues = problemData.options.map(opt => opt.value)
    if (!optionValues.includes(problemData.correct_answer)) {
      throw new Error('Correct answer does not match any option')
    }

    // Save to database
    const { data: session, error: dbError } = await supabase
      .from('math_problem_sessions')
      .insert({
        problem_text: problemData.problem_text,
        correct_answer: problemData.correct_answer,
        options: problemData.options,
        difficulty: selectedDifficulty,
        topic: problemData.topic || null,
        hint_text: problemData.hint || null,
        solution_steps: problemData.solution_steps || null,
        user_id: user_id
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to save problem to database')
    }

    return NextResponse.json({
      session_id: session.id,
      problem_text: session.problem_text,
      final_answer: session.correct_answer,
      options: session.options,
      difficulty: session.difficulty,
      topic: session.topic,
      hint: session.hint_text
    })

  } catch (error) {
    console.error('Error generating problem:', error)
    return NextResponse.json(
      { error: 'Failed to generate problem. Please try again.' },
      { status: 500 }
    )
  }
}
