import React from 'react';
import type { TrustTask } from '../types';
import './TaskCard.css';

export interface TaskCardProps {
  task: TrustTask;
  isConnected: boolean;
  isLoading: boolean;
  onEndorse: (task: TrustTask) => void;
  onConnect: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, isConnected, isLoading, onEndorse, onConnect }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>By {task.freelancer}</p>
      <div className="trust-score-badge">Trust Score: {task.trustScore}</div>
      <button 
        className="btn btn-primary btn-glow"
        style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
        disabled={isLoading} 
        onClick={() => isConnected ? onEndorse(task) : onConnect()}
      >
        {isLoading ? 'Processing...' : isConnected ? 'Endorse Trust' : 'Connect to Endorse'}
      </button>
    </div>
  );
};

