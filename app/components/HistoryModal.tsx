'use client'

import { useEffect, useState } from 'react'

interface HistoryItem {
  session_id: string
  created_at: string
  problem_text: string
  difficulty: string
  topic: string | null
  is_correct: boolean | null
  hint_used: boolean
  user_answer?: number
  correct_answer?: number
  options?: Array<{text: string, value: number}>
}

interface HistoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'difficulty' | 'result'>('date')
  const [filterBy, setFilterBy] = useState<'all' | 'correct' | 'incorrect' | 'hint'>('all')
  const [selectedProblem, setSelectedProblem] = useState<HistoryItem | null>(null)

  useEffect(() => {
    if (isOpen) {
      fetchHistory()
    }
  }, [isOpen])

  const fetchHistory = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Get user_id from localStorage
      const userId = localStorage.getItem('math_app_user_id')

      // Build URL with user_id query parameter
      const url = userId
        ? `/api/problem-history?user_id=${encodeURIComponent(userId)}`
        : '/api/problem-history'

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch history')
      }

      const data = await response.json()
      setHistory(data.history || [])
    } catch (err) {
      console.error('Error fetching history:', err)
      setError('Failed to load problem history')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAndSortedHistory = history
    .filter(item => {
      if (filterBy === 'correct') return item.is_correct === true
      if (filterBy === 'incorrect') return item.is_correct === false
      if (filterBy === 'hint') return item.hint_used === true
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      if (sortBy === 'difficulty') {
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 }
        return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
      }
      if (sortBy === 'result') {
        if (a.is_correct === b.is_correct) return 0
        if (a.is_correct === true) return -1
        if (b.is_correct === true) return 1
        return 0
      }
      return 0
    })

  const stats = {
    total: history.length,
    correct: history.filter(item => item.is_correct === true).length,
    incorrect: history.filter(item => item.is_correct === false).length,
    hintsUsed: history.filter(item => item.hint_used === true).length
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '0.75rem',
        maxWidth: 'clamp(300px, 95vw, 900px)',
        width: '100%',
        maxHeight: '90vh',
        border: '1px solid #333333',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#cccccc',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            transition: 'color 0.2s ease',
            zIndex: 1
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#cccccc';
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{
          padding: 'clamp(1rem, 5vw, 2rem) clamp(1rem, 5vw, 2rem) clamp(0.5rem, 3vw, 1rem) clamp(1rem, 5vw, 2rem)',
          borderBottom: '1px solid #333333'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 3vw, 0.75rem)',
            marginBottom: 'clamp(0.75rem, 4vw, 1rem)',
            flexWrap: 'wrap'
          }}>
            <div style={{
              backgroundColor: '#333333',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #555555'
            }}>
              <span style={{ fontSize: '1.25rem' }}>📚</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',
              fontWeight: '300',
              color: '#ffffff',
              margin: 0
            }}>
              Problem History
            </h2>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: 'clamp(0.5rem, 3vw, 1rem)',
            marginBottom: 'clamp(0.75rem, 4vw, 1rem)'
          }}>
            <div style={{
              backgroundColor: '#333333',
              borderRadius: '0.5rem',
              padding: 'clamp(0.5rem, 3vw, 0.75rem)',
              textAlign: 'center',
              border: '1px solid #555555'
            }}>
              <div style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', fontWeight: '600', color: '#ffffff' }}>{stats.total}</div>
              <div style={{ fontSize: 'clamp(0.7rem, 3vw, 0.75rem)', color: '#cccccc' }}>Total</div>
            </div>
            <div style={{
              backgroundColor: '#333333',
              borderRadius: '0.5rem',
              padding: 'clamp(0.5rem, 3vw, 0.75rem)',
              textAlign: 'center',
              border: '1px solid #555555'
            }}>
              <div style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', fontWeight: '600', color: '#4ade80' }}>{stats.correct}</div>
              <div style={{ fontSize: 'clamp(0.7rem, 3vw, 0.75rem)', color: '#cccccc' }}>Correct</div>
            </div>
            <div style={{
              backgroundColor: '#333333',
              borderRadius: '0.5rem',
              padding: 'clamp(0.5rem, 3vw, 0.75rem)',
              textAlign: 'center',
              border: '1px solid #555555'
            }}>
              <div style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', fontWeight: '600', color: '#f87171' }}>{stats.incorrect}</div>
              <div style={{ fontSize: 'clamp(0.7rem, 3vw, 0.75rem)', color: '#cccccc' }}>Incorrect</div>
            </div>
            <div style={{
              backgroundColor: '#333333',
              borderRadius: '0.5rem',
              padding: 'clamp(0.5rem, 3vw, 0.75rem)',
              textAlign: 'center',
              border: '1px solid #555555'
            }}>
              <div style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', fontWeight: '600', color: '#a78bfa' }}>{stats.hintsUsed}</div>
              <div style={{ fontSize: 'clamp(0.7rem, 3vw, 0.75rem)', color: '#cccccc' }}>Hints</div>
            </div>
          </div>

          {/* Filters and Sort */}
          <div style={{
            display: 'flex',
            gap: 'clamp(0.5rem, 3vw, 1rem)',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: 'clamp(0.75rem, 4vw, 1rem)'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'clamp(0.8rem, 3.5vw, 0.875rem)', color: '#cccccc' }}>Filter:</span>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                style={{
                  padding: 'clamp(0.4rem, 2vw, 0.5rem)',
                  borderRadius: '0.25rem',
                  border: '1px solid #555555',
                  backgroundColor: '#333333',
                  color: '#ffffff',
                  fontSize: 'clamp(0.8rem, 3.5vw, 0.875rem)'
                }}
              >
                <option value="all">All</option>
                <option value="correct">Correct</option>
                <option value="incorrect">Incorrect</option>
                <option value="hint">With Hints</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'clamp(0.8rem, 3.5vw, 0.875rem)', color: '#cccccc' }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  padding: 'clamp(0.4rem, 2vw, 0.5rem)',
                  borderRadius: '0.25rem',
                  border: '1px solid #555555',
                  backgroundColor: '#333333',
                  color: '#ffffff',
                  fontSize: 'clamp(0.8rem, 3.5vw, 0.875rem)'
                }}
              >
                <option value="date">Date</option>
                <option value="difficulty">Difficulty</option>
                <option value="result">Result</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'clamp(0.75rem, 4vw, 1rem) clamp(1rem, 5vw, 2rem)'
        }}>
          {isLoading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '3rem'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                border: '2px solid #333333',
                borderTop: '2px solid #ffffff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
          ) : error ? (
            <div style={{
              backgroundColor: '#333333',
              border: '1px solid #555555',
              borderRadius: '0.5rem',
              padding: '1rem',
              color: '#f87171',
              textAlign: 'center'
            }}>
              {error}
            </div>
          ) : filteredAndSortedHistory.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#cccccc'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
              <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No problem history yet</p>
              <p style={{ fontSize: '0.875rem' }}>Your solved problems will appear here</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredAndSortedHistory.map((item) => (
                <div
                  key={item.session_id}
                  onClick={() => setSelectedProblem(item)}
                  style={{
                    backgroundColor: '#333333',
                    borderRadius: '0.5rem',
                    padding: 'clamp(1rem, 4vw, 1.5rem)',
                    border: '1px solid #555555',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#666666';
                    e.currentTarget.style.backgroundColor = '#3a3a3a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#555555';
                    e.currentTarget.style.backgroundColor = '#333333';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 'clamp(0.5rem, 3vw, 1rem)',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <p style={{
                        color: '#ffffff',
                        fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
                        lineHeight: '1.5',
                        marginBottom: 'clamp(0.75rem, 3vw, 1rem)',
                        margin: 0
                      }}>
                        {item.problem_text}
                      </p>

                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'clamp(0.25rem, 2vw, 0.5rem)',
                        alignItems: 'center'
                      }}>
                        {/* Date */}
                        <span style={{
                          fontSize: 'clamp(0.7rem, 3vw, 0.75rem)',
                          color: '#cccccc',
                          backgroundColor: '#1a1a1a',
                          padding: 'clamp(0.2rem, 1vw, 0.25rem) clamp(0.4rem, 2vw, 0.5rem)',
                          borderRadius: '0.25rem',
                          border: '1px solid #444444'
                        }}>
                          {new Date(item.created_at).toLocaleDateString('en-SG', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>

                        {/* Difficulty */}
                        {item.difficulty && (
                          <span style={{
                            fontSize: 'clamp(0.7rem, 3vw, 0.75rem)',
                            fontWeight: '500',
                            padding: 'clamp(0.2rem, 1vw, 0.25rem) clamp(0.4rem, 2vw, 0.5rem)',
                            borderRadius: '0.25rem',
                            backgroundColor: item.difficulty === 'easy' ? '#1a4d1a' : item.difficulty === 'medium' ? '#4d3d1a' : '#4d1a1a',
                            color: item.difficulty === 'easy' ? '#4ade80' : item.difficulty === 'medium' ? '#fbbf24' : '#f87171',
                            border: `1px solid ${item.difficulty === 'easy' ? '#2d5a2d' : item.difficulty === 'medium' ? '#6b5a2d' : '#6b2d2d'}`
                          }}>
                            {item.difficulty}
                          </span>
                        )}

                        {/* Topic */}
                        {item.topic && (
                          <span style={{
                            fontSize: 'clamp(0.7rem, 3vw, 0.75rem)',
                            fontWeight: '500',
                            padding: 'clamp(0.2rem, 1vw, 0.25rem) clamp(0.4rem, 2vw, 0.5rem)',
                            borderRadius: '0.25rem',
                            backgroundColor: '#1a2d4d',
                            color: '#60a5fa',
                            border: '1px solid #2d4d6b'
                          }}>
                            {item.topic}
                          </span>
                        )}

                        {/* Hint Used */}
                        {item.hint_used && (
                          <span style={{
                            fontSize: 'clamp(0.7rem, 3vw, 0.75rem)',
                            fontWeight: '500',
                            padding: 'clamp(0.2rem, 1vw, 0.25rem) clamp(0.4rem, 2vw, 0.5rem)',
                            borderRadius: '0.25rem',
                            backgroundColor: '#2d1a4d',
                            color: '#a78bfa',
                            border: '1px solid #4d2d6b'
                          }}>
                            💡 Hint used
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Result Badge */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 'clamp(32px, 8vw, 40px)',
                      height: 'clamp(32px, 8vw, 40px)',
                      borderRadius: '50%',
                      backgroundColor: item.is_correct === true ? '#1a4d1a' : item.is_correct === false ? '#4d1a1a' : '#2d2d2d',
                      border: `1px solid ${item.is_correct === true ? '#2d5a2d' : item.is_correct === false ? '#6b2d2d' : '#444444'}`
                    }}>
                      {item.is_correct === true ? (
                        <span style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: '#4ade80' }}>✓</span>
                      ) : item.is_correct === false ? (
                        <span style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: '#f87171' }}>✗</span>
                      ) : (
                        <span style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: '#888888' }}>—</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 2rem',
          borderTop: '1px solid #333333',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            Close
          </button>
        </div>

        {/* Detailed Problem View Modal */}
        {selectedProblem && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '1rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            <div style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '0.75rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              border: '1px solid #333333',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedProblem(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  color: '#cccccc',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  transition: 'color 0.2s ease',
                  zIndex: 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#cccccc';
                }}
              >
                ×
              </button>

              {/* Header */}
              <div style={{
                padding: '2rem 2rem 1rem 2rem',
                borderBottom: '1px solid #333333'
              }}>
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  margin: 0,
                  marginBottom: '0.5rem'
                }}>
                  Problem Details
                </h2>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#cccccc',
                    backgroundColor: '#333333',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem'
                  }}>
                    {new Date(selectedProblem.created_at).toLocaleDateString()}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#cccccc',
                    backgroundColor: '#333333',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem'
                  }}>
                    {selectedProblem.difficulty}
                  </span>
                  {selectedProblem.topic && (
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#cccccc',
                      backgroundColor: '#333333',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem'
                    }}>
                      {selectedProblem.topic}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div style={{
                padding: '2rem',
                flex: 1,
                overflow: 'auto'
              }}>
                {/* Problem Text */}
                <div style={{
                  backgroundColor: '#333333',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: '1px solid #555555'
                }}>
                  <h3 style={{
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    margin: 0,
                    marginBottom: '1rem'
                  }}>
                    Problem:
                  </h3>
                  <p style={{
                    color: '#ffffff',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {selectedProblem.problem_text}
                  </p>
                </div>

                {/* Answer Section */}
                <div style={{
                  backgroundColor: '#333333',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: '1px solid #555555'
                }}>
                  <h3 style={{
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    margin: 0,
                    marginBottom: '1rem'
                  }}>
                    Your Answer vs Correct Answer:
                  </h3>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}>
                    {/* Your Answer */}
                    <div style={{
                      backgroundColor: '#1a1a1a',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      border: `2px solid ${selectedProblem.is_correct ? '#22c55e' : '#ef4444'}`
                    }}>
                      <h4 style={{
                        color: selectedProblem.is_correct ? '#22c55e' : '#ef4444',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        margin: 0,
                        marginBottom: '0.5rem'
                      }}>
                        Your Answer
                      </h4>
                      <p style={{
                        color: '#ffffff',
                        fontSize: '1rem',
                        fontWeight: '500',
                        margin: 0
                      }}>
                        {selectedProblem.user_answer !== undefined ? selectedProblem.user_answer : 'No answer'}
                      </p>
                    </div>

                    {/* Correct Answer */}
                    <div style={{
                      backgroundColor: '#1a1a1a',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      border: '2px solid #22c55e'
                    }}>
                      <h4 style={{
                        color: '#22c55e',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        margin: 0,
                        marginBottom: '0.5rem'
                      }}>
                        Correct Answer
                      </h4>
                      <p style={{
                        color: '#ffffff',
                        fontSize: '1rem',
                        fontWeight: '500',
                        margin: 0
                      }}>
                        {selectedProblem.correct_answer !== undefined ? selectedProblem.correct_answer : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Result Badge */}
                  <div style={{
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      backgroundColor: selectedProblem.is_correct ? '#22c55e' : '#ef4444',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {selectedProblem.is_correct ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                </div>

                {/* Options (if available) */}
                {selectedProblem.options && selectedProblem.options.length > 0 && (
                  <div style={{
                    backgroundColor: '#333333',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    border: '1px solid #555555'
                  }}>
                    <h3 style={{
                      color: '#ffffff',
                      fontSize: '1.1rem',
                      fontWeight: '500',
                      margin: 0,
                      marginBottom: '1rem'
                    }}>
                      Answer Options:
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.75rem'
                    }}>
                      {selectedProblem.options.map((option, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: '#1a1a1a',
                            borderRadius: '0.5rem',
                            padding: '0.75rem',
                            border: `2px solid ${
                              option.value === selectedProblem.user_answer 
                                ? (selectedProblem.is_correct ? '#22c55e' : '#ef4444')
                                : option.value === selectedProblem.correct_answer
                                ? '#22c55e'
                                : '#555555'
                            }`
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <span style={{
                              backgroundColor: option.value === selectedProblem.user_answer 
                                ? (selectedProblem.is_correct ? '#22c55e' : '#ef4444')
                                : option.value === selectedProblem.correct_answer
                                ? '#22c55e'
                                : '#666666',
                              color: '#ffffff',
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span style={{
                              color: '#ffffff',
                              fontSize: '0.9rem'
                            }}>
                              {option.text}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hint Usage */}
                {selectedProblem.hint_used && (
                  <div style={{
                    backgroundColor: '#333333',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    marginTop: '1rem',
                    border: '1px solid #555555',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ color: '#fbbf24', fontSize: '1.2rem' }}>💡</span>
                    <span style={{
                      color: '#fbbf24',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      Hint was used for this problem
                    </span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{
                padding: '1rem 2rem',
                borderTop: '1px solid #333333',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => setSelectedProblem(null)}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }}
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}
