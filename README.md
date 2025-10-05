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

So here's what I built! 🚀


**The Timer That Actually Looks Cool:**
- Built this circular timer using SVG that changes colors as time runs out (green → yellow → red). Way better than boring numbers!
- Easy gets 30 seconds, Medium gets 1 minute, Hard gets 2 minutes - feels right for each level
- Timer only shows up when you want it (there's a toggle in settings)
- When time hits zero, it stops but doesn't auto-advance - you gotta click to move on (hate when apps rush you!)

**User Stuff (The localStorage Magic):**
- Used `crypto.randomUUID()` to give each user a unique ID that sticks around in localStorage
- Your progress saves even if you close the browser and come back later - no more losing your streak!
- No personal info collected, just anonymous IDs so we can track your math journey
- You can see your entire problem history and how you're improving over time

**Mobile-First Because That's How People Actually Use Apps:**
- Used `clamp()` for fonts so everything scales nicely from phone to desktop
- Made grids that adapt to any screen size with `repeat(auto-fit, minmax())` - looks good everywhere
- Big touch targets and smooth interactions for mobile users
- Proper viewport setup so it actually works on phones

**Making It Actually Fun to Use:**
- Put everything in modals so the main screen isn't cluttered - Settings, History, Metrics all pop up cleanly
- Answer buttons are A/B/C/D with colors that make sense (blue when you pick, red if wrong, green if right)
- You can click on any old problem in your history to see the full breakdown - super helpful for learning
- Hints don't spoil everything - you gotta click "Show Hint" to see them
- Stats dashboard shows your accuracy and time spent - gamification without being annoying

**Technical Stuff That Actually Works:**
- Went full TypeScript because I hate runtime errors
- Made all API routes dynamic so they don't break on Vercel (learned that the hard way!)
- Proper error handling so users get helpful messages instead of cryptic errors
- Organized code into logical components - no spaghetti code here
- Fixed all the build issues so it actually deploys without breaking

**Ready to Ship:**
- Fixed all the Vercel deployment issues (viewport metadata, dynamic rendering, etc.)
- Environment variables set up properly for Supabase and Google AI
- Custom abacus favicon because why not make it look professional? 🧮

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