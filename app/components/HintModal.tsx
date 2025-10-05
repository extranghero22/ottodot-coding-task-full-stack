'use client'

import { useState } from 'react'

interface HintModalProps {
  isOpen: boolean
  onClose: () => void
  hint: string | null
  onHintUsed: () => void
  disabled?: boolean
}

export default function HintModal({
  isOpen,
  onClose,
  hint,
  onHintUsed,
  disabled = false
}: HintModalProps) {
  const [hintRevealed, setHintRevealed] = useState(false)

  if (!isOpen || !hint) return null

  const handleShowHint = () => {
    setHintRevealed(true)
    onHintUsed()
  }

  const handleClose = () => {
    setHintRevealed(false)
    onClose()
  }

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
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid #333333',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
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
            transition: 'color 0.2s ease'
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

        {/* Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          paddingRight: '2rem'
        }}>
          <div style={{
            backgroundColor: '#a78bfa',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #8b5cf6'
          }}>
            <span style={{ fontSize: '1.25rem' }}>💡</span>
          </div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '300',
            color: '#ffffff',
            margin: 0
          }}>
            Hint
          </h2>
        </div>

        {/* Hint Content */}
        <div style={{
          backgroundColor: '#333333',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid #555555',
          marginBottom: '1.5rem'
        }}>
          {hintRevealed ? (
            <p style={{
              fontSize: '1rem',
              color: '#ffffff',
              lineHeight: '1.6',
              margin: 0
            }}>
              {hint}
            </p>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🔒</span>
              <p style={{
                fontSize: '1rem',
                color: '#cccccc',
                margin: 0,
                fontStyle: 'italic'
              }}>
                Click "Show Hint" to reveal the hint
              </p>
            </div>
          )}
        </div>

        {/* Warning Message */}
        <div style={{
          backgroundColor: '#333333',
          borderRadius: '0.5rem',
          padding: '1rem',
          border: '1px solid #555555',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <span style={{ fontSize: '1rem' }}>⚠️</span>
            <span style={{
              fontSize: '0.875rem',
              color: '#fbbf24',
              fontWeight: '500'
            }}>
              Note
            </span>
          </div>
          <p style={{
            fontSize: '0.8rem',
            color: '#cccccc',
            lineHeight: '1.4',
            margin: 0
          }}>
            Using a hint will be recorded in your statistics. Take your time to think about the problem first!
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleClose}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              border: '1px solid #555555',
              backgroundColor: 'transparent',
              color: '#cccccc',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333333';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#cccccc';
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleShowHint}
            disabled={disabled}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: disabled ? '#333333' : '#a78bfa',
              color: disabled ? '#666666' : '#ffffff',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = '#8b5cf6';
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = '#a78bfa';
              }
            }}
          >
            Show Hint
          </button>
        </div>
      </div>
    </div>
  )
}
