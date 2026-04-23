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
        <h2>Endorse {task.title}</h2>
        <input 
          type="number"
          placeholder="Trust Points to Endorse" 
          value={amount} 
          onChange={e => setAmount(Number(e.target.value))} 
        />
        <button disabled={isLoading} onClick={() => onEndorse(amount)}>
          Submit Endorsement
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
