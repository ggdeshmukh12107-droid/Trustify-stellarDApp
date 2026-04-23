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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Task</h2>
        <input 
          placeholder="Task Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />
        <button disabled={isLoading} onClick={() => onSubmit({ title, description: 'mock' })}>
          Submit
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
