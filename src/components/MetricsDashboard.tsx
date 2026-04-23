import React from 'react';
import './MetricsDashboard.css';

export const MetricsDashboard: React.FC = () => {
  return (
    <div className="metrics-dashboard panel">
      <h2>Network Metrics</h2>
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Users</h3>
          <p className="metric-value">31</p>
          <span className="metric-trend positive">↑ 12% this week</span>
        </div>
        <div className="metric-card">
          <h3>Trust Endorsements</h3>
          <p className="metric-value">1,402</p>
          <span className="metric-trend positive">↑ 5% this week</span>
        </div>
        <div className="metric-card">
          <h3>Active Dispute Rate</h3>
          <p className="metric-value">0.4%</p>
          <span className="metric-trend neutral">Stable</span>
        </div>
      </div>
      <div className="chart-placeholder">
        {/* Placeholder for Recharts/D3 */}
        <p>📊 Trust Score Growth Over Time (Simulated Index Data)</p>
      </div>
    </div>
  );
};
