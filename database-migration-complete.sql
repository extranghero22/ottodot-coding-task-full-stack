-- Complete Database Migration for Math Problem Generator
-- This migration includes all necessary schema changes for the application

-- Add options column to math_problem_sessions table (if not exists)
ALTER TABLE math_problem_sessions ADD COLUMN IF NOT EXISTS options JSONB;

-- Add new columns to math_problem_sessions table
ALTER TABLE math_problem_sessions
ADD COLUMN IF NOT EXISTS difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
ADD COLUMN IF NOT EXISTS topic VARCHAR(100),
ADD COLUMN IF NOT EXISTS hint_text TEXT,
ADD COLUMN IF NOT EXISTS solution_steps TEXT,
ADD COLUMN IF NOT EXISTS user_id VARCHAR(255);

-- Add new columns to math_problem_submissions table
ALTER TABLE math_problem_submissions
ADD COLUMN IF NOT EXISTS hint_used BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER,
ADD COLUMN IF NOT EXISTS user_id VARCHAR(255);

-- Create user_sessions table for tracking user progress
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_problems_attempted INTEGER DEFAULT 0,
    total_correct INTEGER DEFAULT 0,
    total_incorrect INTEGER DEFAULT 0,
    total_hints_used INTEGER DEFAULT 0
);

-- Create user_stats table for detailed statistics by topic and difficulty
CREATE TABLE IF NOT EXISTS user_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_token VARCHAR(255) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    problems_attempted INTEGER DEFAULT 0,
    problems_correct INTEGER DEFAULT 0,
    average_time_seconds NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_token, topic, difficulty)
);

-- Enable Row Level Security for new tables
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for anonymous access
CREATE POLICY "Allow anonymous access to user_sessions" ON user_sessions
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow anonymous access to user_stats" ON user_stats
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_math_problem_sessions_difficulty ON math_problem_sessions(difficulty);
CREATE INDEX IF NOT EXISTS idx_math_problem_sessions_topic ON math_problem_sessions(topic);
CREATE INDEX IF NOT EXISTS idx_math_problem_sessions_user_id ON math_problem_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_math_problem_submissions_user_id ON math_problem_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_stats_session_token ON user_stats(session_token);
CREATE INDEX IF NOT EXISTS idx_user_stats_topic_difficulty ON user_stats(topic, difficulty);

-- Drop the existing view first (if it exists)
DROP VIEW IF EXISTS problem_history;

-- Create a comprehensive view for problem history with full details including user_id
CREATE OR REPLACE VIEW problem_history AS
SELECT
    s.id as session_id,
    s.created_at,
    s.problem_text,
    s.correct_answer,
    s.options,
    s.difficulty,
    s.topic,
    s.hint_text,
    s.user_id,
    sub.user_answer,
    sub.is_correct,
    sub.feedback_text,
    sub.hint_used,
    sub.time_spent_seconds,
    sub.created_at as submitted_at
FROM math_problem_sessions s
LEFT JOIN math_problem_submissions sub ON s.id = sub.session_id
ORDER BY s.created_at DESC;

-- Add table comments
COMMENT ON TABLE math_problem_sessions IS 'Stores generated math problems with metadata';
COMMENT ON TABLE math_problem_submissions IS 'Stores user answers and feedback';
COMMENT ON TABLE user_sessions IS 'Tracks anonymous user sessions and overall progress';
COMMENT ON TABLE user_stats IS 'Detailed statistics by topic and difficulty for each user';
COMMENT ON VIEW problem_history IS 'Consolidated view of problems and submissions for history display';
