import React from 'react';
import type { TrustTask } from '../types';
import './TaskCard.css';

export interface TaskCardProps {
  task: TrustTask;
  isConnected: boolean;
  isLoading: boolean;
  onEndorse: (task: TrustTask) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, isConnected, isLoading, onEndorse }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>By {task.freelancer}</p>
      <div className="trust-score-badge">Score: {task.trustScore}</div>
      <button 
        disabled={!isConnected || isLoading} 
        onClick={() => onEndorse(task)}
      >
        {isLoading ? 'Processing...' : 'Endorse Trust'}
      </button>
    </div>
  );
};
