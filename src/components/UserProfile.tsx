import React from 'react';
import type { TrustTask } from '../types';

export const UserProfile: React.FC<{
  publicKey: string;
  tasks: TrustTask[];
}> = ({ publicKey, tasks }) => {
  const userTasks = tasks.filter(t => t.creator === publicKey);
  const totalScore = userTasks.reduce((s, t) => s + t.trustScore, 0);

  return (
    <section className="user-profile panel">
      <h2>Your Reputation Profile</h2>
      <div className="profile-stats">
        <p><strong>Wallet:</strong> {publicKey}</p>
        <p><strong>Trust Points:</strong> {totalScore}</p>
        <p><strong>Tasks Validated:</strong> {userTasks.length}</p>
      </div>
    </section>
  );
};
