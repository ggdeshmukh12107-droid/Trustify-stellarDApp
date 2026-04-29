import { useState, useEffect } from 'react';
import type { TrustTask, CreateTaskInput } from '../types';
import { globalIndexer } from '../utils/dataIndexer';
import { Monitoring } from '../utils/monitoring';

export function useTrustSystem() {
  const [tasks, setTasks] = useState<TrustTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allEndorsements, setAllEndorsements] = useState<any[]>([]);

  useEffect(() => {
    // Simulated fetching tasks
    setIsLoading(true);
    setTimeout(() => {
      const mockTasks = [
        { id: '1', title: 'Smart Contract Audit', trustScore: 80, freelancer: 'Anonymous', completed: false },
        { id: '2', title: 'Frontend Design', trustScore: 40, freelancer: 'Alice', completed: true },
      ];
      setTasks(mockTasks as any);
      globalIndexer.indexData('tasks', mockTasks);
      setIsLoading(false);
      Monitoring.trackEvent('tasks_loaded', { count: mockTasks.length });
    }, 1000);
  }, []);

  const createTask = async (input: CreateTaskInput, user: string) => {
    Monitoring.trackEvent('task_created', { title: input.title });
    setTasks(prev => [...prev, { id: Date.now().toString(), title: input.title, description: input.description, trustScore: 0, freelancer: user, completed: false } as any]);
  };

  const endorseTask = async (input: { taskId: string; amount: number }, user: string, _signer?: any) => {
    Monitoring.trackEvent('task_endorsed', { taskId: input.taskId, amount: input.amount });
    setAllEndorsements(prev => [...prev, { taskId: input.taskId, amount: input.amount, from: user }]);
  };

  return { tasks, isLoading, createTask, endorseTask, allEndorsements };
}
