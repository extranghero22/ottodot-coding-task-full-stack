# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered math problem generator application for Primary 5 students (age 10-11). It generates multiple-choice math word problems using Google's Gemini AI, saves problems and submissions to Supabase, and provides personalized AI-generated feedback.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (starts on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm lint
```

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_API_KEY=your_google_gemini_api_key
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **AI**: Google Generative AI (Gemini 2.0 Flash)

### Data Flow

1. **Problem Generation Flow**:
   - User clicks to generate problem
   - `app/page.tsx` calls `/api/generate-problem`
   - API route uses Gemini AI to generate problem with 4 multiple-choice options
   - Problem saved to `math_problem_sessions` table in Supabase
   - Session ID and problem data returned to frontend

2. **Answer Submission Flow**:
   - User submits answer via `QuestionScreen` component
   - `app/page.tsx` calls `/api/submit-answer` with session_id and user_answer
   - API route fetches original problem from database
   - Checks correctness, uses Gemini AI to generate personalized feedback
   - Submission saved to `math_problem_submissions` table
   - Feedback and correctness returned to frontend

### Database Schema

**math_problem_sessions**:
- `id` (UUID, primary key)
- `created_at` (timestamp)
- `problem_text` (text)
- `correct_answer` (numeric)
- `options` (JSONB array of {text, value})
- `difficulty` (varchar, values: 'easy', 'medium', 'hard')
- `topic` (varchar, P5 curriculum topics)
- `hint_text` (text, AI-generated hint)
- `solution_steps` (text, step-by-step solution)

**math_problem_submissions**:
- `id` (UUID, primary key)
- `session_id` (UUID, foreign key → math_problem_sessions)
- `user_answer` (numeric)
- `is_correct` (boolean)
- `feedback_text` (text)
- `created_at` (timestamp)
- `hint_used` (boolean, whether student used hint)
- `time_spent_seconds` (integer, time on problem)

**user_sessions**:
- `id` (UUID, primary key)
- `session_token` (varchar, unique)
- `total_problems_attempted` (integer)
- `total_correct` (integer)
- `total_incorrect` (integer)
- `total_hints_used` (integer)

**user_stats**:
- `id` (UUID, primary key)
- `difficulty_easy_count` (integer)
- `difficulty_medium_count` (integer)
- `difficulty_hard_count` (integer)
- Topic-specific counters (whole_numbers_count, fractions_count, etc.)

**problem_history view**:
- Joins sessions and submissions for history display
- Includes: session_id, created_at, problem_text, difficulty, topic, is_correct, hint_used

### Key Files

**API Routes**:
- `app/api/generate-problem/route.ts` - Generates problems using Gemini AI with difficulty/topic support
- `app/api/submit-answer/route.ts` - Checks answers and generates personalized feedback
- `app/api/problem-history/route.ts` - Fetches problem history from database view

**Frontend Components**:
- `app/page.tsx` - Main page with state management and API calls
- `app/components/StartScreen.tsx` - Initial screen with start button and settings access
- `app/components/QuestionScreen.tsx` - Problem display, answer selection, and result display
- `app/components/AnswerButton.tsx` - Multiple choice option buttons with A/B/C/D labels
- `app/components/SettingsModal.tsx` - Modal for difficulty and topic selection
- `app/components/ScoreCard.tsx` - Progress tracking display (questions, accuracy, hints)
- `app/components/MetricsModal.tsx` - Modal displaying detailed user metrics
- `app/components/HintModal.tsx` - Modal for displaying hints
- `app/components/HistoryModal.tsx` - Modal displaying past problems and results with detailed view

**Utilities**:
- `lib/supabaseClient.ts` - Supabase client initialization with TypeScript types

### AI Integration Details

**Problem Generation Prompt** (`app/api/generate-problem/route.ts:12-65`):
- **Curriculum Alignment**: Follows Singapore Primary 5 Mathematics Syllabus (2021)
- **Topic Coverage**:
  - Number & Algebra: Whole numbers (up to 10M), fractions (4 operations), decimals, percentage, rate
  - Measurement & Geometry: Area of triangle, volume of cube/cuboid, angles, triangles, quadrilaterals
- **Pedagogical Approach**: Realistic contexts, conceptual understanding, age-appropriate complexity
- **Quality Controls**:
  - AI solves problem step-by-step before generating options
  - Creates 3 plausible distractors based on common student misconceptions
  - Validates correct_answer matches one option value exactly
  - Returns JSON with topic classification for analytics

**Feedback Generation Prompt** (`app/api/submit-answer/route.ts:40-73`):
- **Based on Singapore Math Pedagogy**:
  - Builds confidence and fosters interest
  - Develops reasoning and communication skills
  - Focuses on conceptual understanding over memorization
  - Supports metacognition (self-reflection)
- **For Correct Answers (2-3 sentences)**:
  - Celebrates success specifically
  - Explains WHY the solution works
  - Encourages continued practice
- **For Incorrect Answers (3-4 sentences)**:
  - Acknowledges effort positively
  - Identifies specific error or misconception
  - Provides hints without revealing full answer
  - Encourages trying again with new understanding
- **Tone**: Warm, encouraging, patient, growth-mindset focused

### State Management

All state is managed in `app/page.tsx` using React hooks:
- `problem` - Current math problem data
- `sessionId` - Database session ID for current problem
- `feedback` - AI-generated feedback text
- `isCorrect` - Whether answer was correct
- `isLoading` - Loading state for async operations
- `questionNumber` - Current question number for UI
- `answerCount` - Number of answers submitted
- `difficulty` - Selected difficulty level ('easy', 'medium', 'hard')
- `topic` - Selected curriculum topic (or null for all topics)
- `totalCorrect` - Total correct answers in session
- `totalIncorrect` - Total incorrect answers in session
- `totalHintsUsed` - Total hints used in session
- `hintUsedCurrentQuestion` - Whether hint was used for current question
- `showSettings` - Whether to show settings panel
- `showHistory` - Whether to show history modal
- `selectedAnswer` - User's selected answer value

### Database Setup

Run `database.sql` in Supabase SQL Editor to:
1. Create tables with proper schema
2. Enable Row Level Security (RLS)
3. Create permissive policies for anonymous access (assessment purposes only)
4. Add performance indexes

**Migration Files**:
- `database.sql` - Initial schema setup
- `database-migration-complete.sql` - Complete migration with all features (difficulty, topics, hints, user sessions, user_id support)

## Common Development Patterns

### Adding New API Routes
1. Create `app/api/[route-name]/route.ts`
2. Import Gemini AI client and Supabase client from `@google/generative-ai` and `@/lib/supabaseClient`
3. Export async POST/GET functions
4. Handle errors with try-catch and return NextResponse.json

### Working with AI Responses
- Always clean markdown code blocks from Gemini responses: `text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()`
- Validate JSON structure before using
- Handle parsing errors gracefully

### Supabase Type Safety
- TypeScript types defined in `lib/supabaseClient.ts`
- Use `.select()` and `.single()` for fetching single records
- Use `.insert()` with `.select()` to get inserted data back
- Check for errors in `{ data, error }` destructured response

## Singapore Primary 5 Mathematics Curriculum Constraints

### Curriculum Source
Based on **2021 Primary Mathematics Syllabus (P1-P6)** published by Singapore Ministry of Education.

### Primary 5 Standard Mathematics Topics

**Number and Algebra**:
- Whole numbers up to 10 million
- Four operations (with brackets, order of operations)
- Factors and multiples
- Fractions (all 4 operations, emphasis on multiplication)
- Decimals (operations, conversions, rounding)
- Percentage (finding parts, discount, GST, interest)
- Rate (quantity per unit)

**Measurement and Geometry**:
- Area of triangle (base × height ÷ 2)
- Volume of cube/cuboid (cm³, relationship with litres)
- Angles (straight line, point, vertically opposite)
- Triangle properties (isosceles, equilateral, right-angled, angle sum)
- Quadrilateral properties (parallelogram, rhombus, trapezium)

**Statistics**:
- No new topics at P5 Standard (covered in P4)

### Pedagogical Framework

**Mathematics Curriculum Framework**:
1. **Central Focus**: Mathematical problem-solving competency
2. **Five Components**: Concepts, Skills, Processes, Metacognition, Attitudes
3. **Big Ideas**: Equivalence, Diagrams, Invariance, Measures, Notations, Proportionality

**Teaching Approach**:
- **Relational Understanding** over instrumental understanding (know WHY, not just HOW)
- **Three Phases**: Readiness → Engagement → Mastery
- **Real-world Contexts**: Problems should relate to everyday life
- **Conceptual Understanding**: Emphasis on understanding, not just memorization

### Assessment Principles

**Formative Assessment**:
- Provide timely, specific feedback
- Focus on both strengths and weaknesses
- Help students understand where they are and what to improve
- Support self-directed learning and reflection

**Feedback Guidelines**:
- Be encouraging but honest about errors
- Identify specific misconceptions
- Provide hints, not full solutions (for incorrect answers)
- Build confidence and foster interest in mathematics

## Implemented Features

### 1. Difficulty Levels (Easy/Medium/Hard)

**Implementation**: `app/api/generate-problem/route.ts:17-38`

Three difficulty levels with specific constraints:
- **Easy**: Smaller numbers (within 100), 1-2 step problems, basic operations, simple contexts
- **Medium**: Moderate numbers (within 10,000), 2-3 step problems, realistic contexts, multiple operations
- **Hard**: Large numbers (up to 10M), 3-4 step problems, complex scenarios, order of operations

**UI Component**: `app/components/SettingsModal.tsx`
- Modal-based settings panel accessible from StartScreen
- Color-coded buttons (green/yellow/red) for difficulty levels
- Topic dropdown with P5 curriculum topics
- Default: medium difficulty, all topics
- Persists settings across problems until changed

### 2. Topic-Based Practice

**Available Topics** (aligned with P5 curriculum):
- All Topics (default)
- Whole Numbers
- Fractions
- Decimals
- Percentage
- Rate
- Area
- Volume
- Angles
- Triangles
- Quadrilaterals

**Implementation**:
- Settings modal dropdown: `app/components/SettingsModal.tsx`
- API parameter: `app/api/generate-problem/route.ts:41-44`
- Database storage: `math_problem_sessions.topic`
- Visual badge display on problem screen and history

### 3. Hints System

**Features**:
- AI-generated hints stored with each problem
- Reveal on demand via lightbulb button
- Tracks hint usage per question and total
- Only shows before answer submission

**Implementation**:
- Hint generation: `app/api/generate-problem/route.ts` (included in AI response)
- UI component: `app/components/HintModal.tsx` with "Show Hint" button
- Usage tracking: `app/page.tsx` state management
- Database: `hint_used` boolean in submissions table

### 4. Score Tracking System

**Tracked Metrics**:
- Total questions attempted
- Correct answers count
- Accuracy percentage
- Total hints used
- Session-based tracking (no persistence across page refresh)

**UI Component**: `app/components/ScoreCard.tsx`
- Gradient card design with 4 stat boxes
- Animated progress bar based on accuracy
- Motivational messages based on performance:
  - ≥80% accuracy: "Excellent work! You're a math star!"
  - 60-79% accuracy: "Good job! Keep practicing to improve!"
  - <60% accuracy: "Keep trying! Every mistake is a learning opportunity!"
  - <5 questions: "Great start! Keep going!"

### 5. Problem History View

**Features**:
- View all past problems and results
- Shows problem text, difficulty, topic, result (✓/✗)
- Displays timestamp and hint usage
- Scrollable modal interface
- Fetches from database view

**Implementation**:
- API endpoint: `app/api/problem-history/route.ts`
- Database view: `problem_history` (joins sessions + submissions)
- UI components:
  - `app/components/HistoryModal.tsx` - Modal with scrollable history list and detailed problem view
  - History button in QuestionScreen header
- Features:
  - Shows last 50 problems with filtering and sorting
  - Click on any problem card to see detailed view (problem text, user answer, correct answer, options)
  - Statistics dashboard with total, correct, incorrect, and hints used
  - Only visible when user has attempted problems

### Data Flow for Enhanced Features

**Problem Generation with Settings**:
```typescript
// User selects difficulty and topic in SettingsPanel
// Request sent to API
POST /api/generate-problem
{
  difficulty: "medium",
  topic: "Fractions"
}

// API generates problem with specific constraints
// Response includes hint
{
  problem_text: "...",
  final_answer: 15,
  options: [...],
  difficulty: "medium",
  topic: "Fractions",
  hint: "Remember that when multiplying fractions...",
  session_id: "..."
}

// Saved to database with all metadata
```

**Answer Submission with Hint Tracking**:
```typescript
// User may view hint before answering
// Hint usage tracked in state
POST /api/submit-answer
{
  session_id: "...",
  user_answer: 15,
  hint_used: true  // Future enhancement
}

// Score updated in state
totalCorrect++ or totalIncorrect++
if (hintUsed) totalHintsUsed++
```
