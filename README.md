# Math Problem Generator - Developer Assessment Starter Kit

## Overview

This is a starter kit for building an AI-powered math problem generator application. The goal is to create a standalone prototype that uses AI to generate math word problems suitable for Primary 5 students, saves the problems and user submissions to a database, and provides personalized feedback.

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **AI Integration**: Google Generative AI (Gemini)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd math-problem-generator
```

### 2. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings → API to find your:
   - Project URL (starts with `https://`)
   - Anon/Public Key

### 3. Set Up Database Tables

1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `database.sql`
3. Click "Run" to create the tables and policies

### 4. Get Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini

### 5. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Edit `.env.local` and add your actual keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
   GOOGLE_API_KEY=your_actual_google_api_key
   ```

### 6. Install Dependencies

```bash
npm install
```

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Your Task

### 1. Implement Frontend Logic (`app/page.tsx`)

Complete the TODO sections in the main page component:

- **generateProblem**: Call your API route to generate a new math problem
- **submitAnswer**: Submit the user's answer and get feedback

### 2. Create Backend API Route (`app/api/math-problem/route.ts`)

Create a new API route that handles:

#### POST /api/math-problem (Generate Problem)
- Use Google's Gemini AI to generate a math word problem
- The AI should return JSON with:
  ```json
  {
    "problem_text": "A bakery sold 45 cupcakes...",
    "final_answer": 15
  }
  ```
- Save the problem to `math_problem_sessions` table
- Return the problem and session ID to the frontend

#### POST /api/math-problem/submit (Submit Answer)
- Receive the session ID and user's answer
- Check if the answer is correct
- Use AI to generate personalized feedback based on:
  - The original problem
  - The correct answer
  - The user's answer
  - Whether they got it right or wrong
- Save the submission to `math_problem_submissions` table
- Return the feedback and correctness to the frontend

### 3. Requirements Checklist

- [ ] AI generates appropriate Primary 5 level math problems
- [ ] Problems and answers are saved to Supabase
- [ ] User submissions are saved with feedback
- [ ] AI generates helpful, personalized feedback
- [ ] UI is clean and mobile-responsive
- [ ] Error handling for API failures
- [ ] Loading states during API calls

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add your environment variables in Vercel's project settings
4. Deploy!

## Assessment Submission

When submitting your assessment, provide:

1. **GitHub Repository URL**: Make sure it's public
2. **Live Demo URL**: Your Vercel deployment
3. **Supabase Credentials**: Add these to your README for testing:
   ```
   SUPABASE_URL: [Your Supabase Project URL]
   SUPABASE_ANON_KEY: [Your Supabase Anon Key]
   ```

## Implementation Notes

*Please fill in this section with any important notes about your implementation, design decisions, challenges faced, or features you're particularly proud of.*

### My Implementation:

**🎯 Core Features Implemented:**

- **AI-Powered Problem Generation**: Integrated Google Gemini AI to generate contextually appropriate Primary 5 math problems with realistic scenarios and proper difficulty scaling
- **Dynamic Difficulty System**: Implemented three-tier difficulty (Easy/Medium/Hard) with corresponding time limits and problem complexity
- **Comprehensive Database Schema**: Created robust Supabase tables for sessions, submissions, and user tracking with proper relationships

**⏱️ Advanced Timer Implementation:**
- **Circular Timer Visualization**: Built a custom SVG-based circular timer with dynamic color coding (green → yellow → red) based on time remaining
- **Difficulty-Based Timing**: Easy (30s), Medium (60s), Hard (120s) with smooth animations and visual feedback
- **Conditional Timer Display**: Timer only appears when enabled in settings, with clean toggle functionality
- **Manual Progression Control**: Timer stops at zero but requires user interaction to proceed, preventing automatic question advancement

**🔐 User Identity & Data Persistence:**
- **localStorage-Based User Management**: Implemented automatic user ID generation and persistence using `crypto.randomUUID()`
- **Session Continuity**: User sessions persist across browser refreshes and maintain problem history
- **Privacy-Focused**: No personal data collection - only anonymous user IDs for problem tracking
- **Cross-Session Analytics**: Users can view their complete problem history and performance metrics

**📱 Mobile-First Responsive Design:**
- **Fluid Typography**: Used `clamp()` functions for responsive font sizes that scale smoothly across devices
- **Adaptive Layouts**: Implemented flexible grid systems with `repeat(auto-fit, minmax())` for optimal space utilization
- **Touch-Optimized Interface**: Large touch targets and intuitive gestures for mobile users
- **Viewport Optimization**: Proper meta tags and responsive breakpoints for all screen sizes

**🎨 Enhanced User Experience:**
- **Modal-Based Architecture**: Clean modal system for Settings, Metrics, History, and Hints to reduce UI clutter
- **Smart Answer Feedback**: A/B/C/D labeled buttons with color-coded feedback (blue for selected, red for wrong, green for correct)
- **Detailed History Analysis**: Clickable problem cards showing full problem breakdown, user answers, and correct solutions
- **Hint System**: Progressive hint revelation with "Show Hint" button to prevent accidental spoilers
- **Performance Metrics**: Comprehensive statistics dashboard showing accuracy, time spent, and difficulty progression

**🛠️ Technical Architecture:**
- **TypeScript Throughout**: Full type safety with proper interfaces and error handling
- **API Route Optimization**: Dynamic rendering configuration for all API endpoints to prevent static generation issues
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **Code Organization**: Modular component structure with clear separation of concerns
- **Build Optimization**: Proper .gitignore configuration and build process optimization for deployment

**🚀 Deployment Ready:**
- **Vercel-Optimized**: Fixed all build errors including viewport metadata and dynamic rendering issues
- **Environment Configuration**: Proper environment variable handling for Supabase and Google AI integration
- **Favicon Implementation**: Custom abacus-themed favicon in both SVG and ICO formats for cross-browser compatibility

## Additional Features (Optional)

If you have time, consider adding:

- [ ] Difficulty levels (Easy/Medium/Hard)
- [ ] Problem history view
- [ ] Score tracking
- [ ] Different problem types (addition, subtraction, multiplication, division)
- [ ] Hints system
- [ ] Step-by-step solution explanations

---

Good luck with your assessment! 🎯