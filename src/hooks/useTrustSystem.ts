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

  const endorseTask = async (input: { taskId: string; amount: number }, user: string, signer?: (xdr: string) => Promise<string>) => {
    Monitoring.trackEvent('task_endorsed', { taskId: input.taskId, amount: input.amount });

    const targetTask = tasks.find(t => t.id === input.taskId);
    const title = targetTask ? targetTask.title : 'Marketplace Endorsement';

    if (signer && user !== 'Anonymous') {
      try {
        const { buildAndSubmitDonationTx } = await import('../utils/stellarTx');
        await buildAndSubmitDonationTx(user, input.amount, title, signer);
      } catch (err) {
        console.error('Blockchain endorsement failed, proceeding with offline state update.', err);
        throw err;
      }
    }

    setAllEndorsements(prev => [
      ...prev, 
      { 
        id: Math.random().toString(),
        taskId: input.taskId, 
        amount: input.amount, 
        client: user,
        timestamp: Date.now(),
        taskTitle: title
      }
    ]);
    setTasks(prev => prev.map(t => t.id === input.taskId ? { ...t, trustScore: t.trustScore + input.amount } : t));
  };

  return { tasks, isLoading, createTask, endorseTask, allEndorsements };
}
