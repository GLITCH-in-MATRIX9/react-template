import React, { useState } from 'react';
import './Styles/Dashboard.css';

const Dashboard = () => {
  // Mock reports data
  const mockReports = [
    { id: 1, date: '2023-10-15', content: "This is unacceptable behavior!", score: 85, vote: '✅', status: 'Resolved' },
    { id: 2, date: '2023-10-14', content: "Why would you say that?", score: 45, vote: '❌', status: 'Pending' },
    { id: 3, date: '2023-10-12', content: "Hate speech detected", score: 92, vote: '✅', status: 'Resolved' },
    { id: 4, date: '2023-10-10', content: "Mild profanity", score: 30, vote: '❌', status: 'Resolved' },
    { id: 5, date: '2023-10-08', content: "Personal attack", score: 78, vote: '✅', status: 'Pending' }
  ];

  // Chart data
  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    values: [5, 3, 7, 4, 6, 2, 5],
    maxValue: 8
  };

  // State management
  const [userTolerance, setUserTolerance] = useState(60);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('week');

  // Filter logic
  const filteredReports = mockReports.filter(report => {
    const matchesSeverity = severityFilter === 'all' || report.score >= parseInt(severityFilter);
    return matchesSeverity;
  });

  // Metrics calculations
  const metrics = {
    totalReports: mockReports.length,
    avgToxicity: Math.round(mockReports.reduce((sum, report) => sum + report.score, 0) / mockReports.length),
    resolvedCount: mockReports.filter(r => r.status === 'Resolved').length
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Moderation <span className="highlight">Dashboard</span></h1>
        <div className="tolerance-control">
          <label>Toxicity Blur Level: <strong>{userTolerance}%</strong></label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={userTolerance} 
            onChange={(e) => setUserTolerance(e.target.value)} 
          />
        </div>
      </header>

      {/* Metrics Cards */}
      <section className="metrics-grid">
        <div className="metric-card">
          <h3>Total Reports</h3>
          <p className="metric-value">{metrics.totalReports}</p>
        </div>
        <div className="metric-card">
          <h3>Avg. Toxicity</h3>
          <p className="metric-value">{metrics.avgToxicity}%</p>
        </div>
        <div className="metric-card">
          <h3>Resolved</h3>
          <p className="metric-value">{metrics.resolvedCount}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="filters">
        <div className="filter-group">
          <label>Time Range:</label>
          <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Severity:</label>
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="70">Severe (70%+)</option>
            <option value="40">Moderate (40%+)</option>
          </select>
        </div>
      </section>

      {/* Report Activity Chart */}
      <section className="report-activity">
        <h2>REPORT ACTIVITY</h2>
        <div className="chart-wrapper">
          <div className="y-axis">
            {[8, 6, 4, 2, 0].map((value) => (
              <div key={value} className="y-tick">{value}</div>
            ))}
          </div>

          <div className="chart-area">
            <div className="bars-grid">
              {[8, 6, 4, 2, 0].map((value) => (
                <div 
                  key={`grid-${value}`} 
                  className="grid-line"
                  style={{ bottom: `${(value / chartData.maxValue) * 100}%` }}
                ></div>
              ))}

              <div className="bars-container">
                {chartData.labels.map((day, index) => {
                  const value = chartData.values[index];
                  const height = `${(value / chartData.maxValue) * 100}%`;
                  const color = value > 5 ? '#ff4a4a' : 
                                value > 3 ? '#ffb74d' : '#4caf50';

                  return (
                    <div key={day} className="bar-wrapper">
                      <div 
                        className="chart-bar"
                        style={{
                          height: height,
                          backgroundColor: color,
                          '--bar-color': color
                        }}
                        data-tooltip={`${value} reports`}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="x-axis">
              {chartData.labels.map((day) => (
                <div key={day} className="x-tick">
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reports Table */}
      <section className="reports-section">
        <h2>Recent Actions ({filteredReports.length})</h2>
        <div className="table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Content</th>
                <th>Toxicity</th>
                <th>Vote</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.date}</td>
                  <td className="content-preview">
                    <div 
                      className="blurrable" 
                      style={{ filter: `blur(${report.score >= userTolerance ? '3px' : 'none'})` }}
                    >
                      {report.content}
                    </div>
                  </td>
                  <td>
                    <div 
                      className="toxicity-bar" 
                      style={{ 
                        '--score': `${report.score}%`,
                        '--color': report.score >= 70 ? '#ff4a4a' : 
                                  report.score >= 40 ? '#ffb74d' : '#4caf50'
                      }}
                    >
                      {report.score}%
                    </div>
                  </td>
                  <td className={`vote-${report.vote === '✅' ? 'approve' : 'reject'}`}>
                    {report.vote}
                  </td>
                  <td className={`status-${report.status.toLowerCase()}`}>
                    {report.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;