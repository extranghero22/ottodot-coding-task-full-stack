# AI Math Problem Generator - Development Plan

## Project Overview
Build a standalone prototype that uses AI to generate math word problems for Primary 5 students, saves results to Supabase, and provides personalized feedback.

## Tech Stack Analysis
✅ **Current Setup:**
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Supabase client configured
- Google Generative AI package installed
- Database schema defined
- Basic UI structure in place

## Core Requirements Checklist

### ✅ Completed Setup
- [x] Next.js project structure
- [x] Supabase client configuration
- [x] Database schema (math_problem_sessions, math_problem_submissions)
- [x] Basic UI layout with Tailwind CSS
- [x] Google Generative AI package installed

### 🔄 Implementation Tasks

#### Phase 1: Environment & API Setup
- [ ] **1.1** Create `.env.local` file with required environment variables
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `GOOGLE_AI_API_KEY`
- [ ] **1.2** Create API routes for AI integration
  - `/api/generate-problem` - Generate math problems using Gemini
  - `/api/submit-answer` - Process answers and generate feedback

#### Phase 2: AI Integration
- [ ] **2.1** Implement problem generation service
  - Use Google Gemini to generate Primary 5 level math problems
  - Return structured JSON with `problem_text` and `final_answer`
  - Include error handling and validation
- [ ] **2.2** Implement feedback generation service
  - Generate personalized feedback based on user's answer
  - Provide encouraging messages for correct answers
  - Offer helpful hints for incorrect answers

#### Phase 3: Database Operations
- [ ] **3.1** Create database service functions
  - `saveProblemSession()` - Save generated problems
  - `saveUserSubmission()` - Save user answers and feedback
  - `getSessionHistory()` - Optional: Retrieve problem history
- [ ] **3.2** Implement proper error handling for database operations

#### Phase 4: Frontend Implementation
- [ ] **4.1** Complete the main page functionality
  - Connect `generateProblem()` function to API
  - Connect `submitAnswer()` function to API
  - Implement proper loading states
- [ ] **4.2** Add state management with Jotai (user preference)
  - Problem state management
  - User session tracking
  - Loading states
- [ ] **4.3** Enhance UI/UX
  - Add proper error handling display
  - Improve mobile responsiveness
  - Add success/error animations

#### Phase 5: Error Handling & Polish
- [ ] **5.1** Implement comprehensive error handling
  - API failure scenarios
  - Network connectivity issues
  - Invalid user input handling
- [ ] **5.2** Add loading states and user feedback
  - Skeleton loaders for problem generation
  - Progress indicators for submissions
  - Toast notifications for success/error states

## Optional Features Implementation

### Phase 6: Enhanced Features
- [ ] **6.1** Difficulty levels (Easy/Medium/Hard)
  - Add difficulty selector to UI
  - Modify AI prompts based on difficulty
  - Update database schema if needed
- [ ] **6.2** Problem history view
  - Create history page/component
  - Display past problems and submissions
  - Add filtering and sorting options
- [ ] **6.3** Score tracking
  - Track user performance over time
  - Display statistics dashboard
  - Add achievement system
- [ ] **6.4** Different problem types
  - Addition, subtraction, multiplication, division
  - Problem type selector
  - Specialized AI prompts per type
- [ ] **6.5** Hints system
  - Generate contextual hints
  - Progressive hint levels
  - Hint usage tracking
- [ ] **6.6** Step-by-step solutions
  - Generate detailed solution explanations
  - Show working steps
  - Educational value enhancement

## File Structure Plan

```
app/
├── api/
│   ├── generate-problem/
│   │   └── route.ts
│   └── submit-answer/
│       └── route.ts
├── components/
│   ├── ProblemCard.tsx
│   ├── AnswerForm.tsx
│   ├── FeedbackCard.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorBoundary.tsx
├── lib/
│   ├── supabaseClient.ts (existing)
│   ├── aiService.ts
│   ├── databaseService.ts
│   └── types.ts
├── store/
│   └── atoms.ts (Jotai state)
├── globals.css (existing)
├── layout.tsx (existing)
└── page.tsx (existing - to be updated)
```

## Implementation Priority

### High Priority (Core Requirements)
1. Environment setup and API routes
2. AI integration for problem generation
3. Database operations
4. Basic frontend functionality
5. Error handling and loading states

### Medium Priority (Polish)
1. Enhanced UI/UX
2. State management with Jotai
3. Mobile responsiveness improvements
4. Better error messages

### Low Priority (Optional Features)
1. Difficulty levels
2. Problem history
3. Score tracking
4. Problem types
5. Hints system
6. Step-by-step solutions

## Testing Strategy

### Manual Testing Checklist
- [ ] Generate new problem functionality
- [ ] Submit correct answer
- [ ] Submit incorrect answer
- [ ] Error handling for API failures
- [ ] Mobile responsiveness
- [ ] Loading states
- [ ] Database persistence

### Edge Cases to Test
- [ ] Network connectivity issues
- [ ] Invalid API responses
- [ ] Database connection failures
- [ ] Empty or invalid user input
- [ ] Rapid clicking/button spam

## Success Criteria

### Minimum Viable Product (MVP)
- ✅ AI generates appropriate Primary 5 level math problems
- ✅ Problems and answers are saved to Supabase
- ✅ User submissions are saved with feedback
- ✅ AI generates helpful, personalized feedback
- ✅ UI is clean and mobile-responsive
- ✅ Error handling for API failures
- ✅ Loading states during API calls

### Enhanced Product
- Additional difficulty levels
- Problem history and tracking
- Multiple problem types
- Hints and step-by-step solutions
- Performance analytics

## Estimated Timeline
- **Phase 1-2**: 2-3 hours (Core AI integration)
- **Phase 3-4**: 2-3 hours (Database and frontend)
- **Phase 5**: 1-2 hours (Error handling and polish)
- **Phase 6**: 3-4 hours (Optional features)

**Total Estimated Time**: 8-12 hours for MVP, 12-16 hours for full feature set

## Next Steps
1. Set up environment variables
2. Create API routes for AI integration
3. Implement problem generation service
4. Connect frontend to backend
5. Test and iterate

---

*This plan provides a comprehensive roadmap for building the AI Math Problem Generator while maintaining focus on the core requirements and allowing for optional enhancements.*
