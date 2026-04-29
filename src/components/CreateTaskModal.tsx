import React, { useState } from 'react';
import type { CreateTaskInput } from '../types';

export const CreateTaskModal: React.FC<{
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (input: CreateTaskInput) => Promise<void>;
}> = ({ isOpen, isLoading, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  
  if (!isOpen) return null;

  const handleFormSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ 
      title, 
      description: 'Validation requested for marketplace deliverable.', 
      targetScore: 10, 
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Register Task</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Publish a verifiable goal on the Stellar network to collect trust endorsements.
        </p>

        <div className="modal-input-group">
          <label htmlFor="task-title">Task Title</label>
          <input 
            id="task-title"
            className="modal-input"
            placeholder="e.g. Smart Contract Audit" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button 
            className="btn btn-primary btn-glow" 
            disabled={isLoading || !title.trim()} 
            onClick={handleFormSubmit}
          >
            {isLoading ? 'Registering...' : 'Register Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

