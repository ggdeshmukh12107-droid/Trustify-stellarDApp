import React, { useState } from 'react';
import type { TrustTask } from '../types';

export const EndorseModal: React.FC<{
  task: TrustTask | null;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onEndorse: (amount: number) => Promise<void>;
}> = ({ task, isOpen, isLoading, onClose, onEndorse }) => {
  const [amount, setAmount] = useState(5);
  
  if (!isOpen || !task) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Endorse Trust</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Assign verifiable trust points to <strong>{task.title}</strong> (by {task.freelancer}).
        </p>
        
        <div className="modal-input-group">
          <label htmlFor="endorse-amount">Trust Points to Endorse (XLM)</label>
          <input 
            id="endorse-amount"
            className="modal-input"
            type="number"
            min="1"
            max="100"
            placeholder="e.g. 5" 
            value={amount} 
            onChange={e => setAmount(Number(e.target.value))} 
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button 
            className="btn btn-primary btn-glow" 
            disabled={isLoading || amount <= 0} 
            onClick={() => onEndorse(amount)}
          >
            {isLoading ? 'Processing...' : 'Submit Endorsement'}
          </button>
        </div>
      </div>
    </div>
  );
};

